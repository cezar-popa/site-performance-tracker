/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global gtag, location, requestIdleCallback */

import { getCLS, getFCP, getFID, getLCP } from 'web-vitals';

const getConfig = id => {
	const config = {
		measurement_version: '4',
		page_path: location.pathname,
	};

	if ( id.startsWith( 'UA-' ) ) {
		Object.assign( config, {
			transport_type: 'beacon',
			custom_map: {
				dimension1: 'measurement_version',
				dimension2: 'client_id',
				dimension3: 'segments',
				dimension4: 'config',
				dimension5: 'event_meta',
				dimension6: 'event_debug',
				metric1: 'report_size',
			},
		} );
	}
	if ( id.startsWith( 'G-' ) ) {
		if ( location.hostname !== 'web-vitals-report.web.app' ) {
			config.debug_mode = true;
		}
	}
	return [ 'config', id, config ];
};

const vitalThresholds = {
	CLS: [ 0.1, 0.25 ],
	FCP: [ 1800, 3000 ],
	FID: [ 100, 300 ],
	LCP: [ 2500, 4000 ],
};

function getRating( value, thresholds ) {
	if ( value > thresholds[ 1 ] ) {
		return 'poor';
	}
	if ( value > thresholds[ 0 ] ) {
		return 'ni';
	}
	return 'good';
}

function getNodePath( node ) {
	try {
		let name = node.nodeName.toLowerCase();
		if ( name === 'body' ) {
			return 'html>body';
		}
		if ( node.id ) {
			return `${ name }#${ node.id }`;
		}
		if ( node.className && node.className.length ) {
			name += `.${ [ ...node.classList.values() ].join( '.' ) }`;
		}
		return `${ getNodePath( node.parentElement ) }>${ name }`;
	} catch ( error ) {
		return '(error)';
	}
}

function getDebugInfo( metricName, entries = [] ) {
	const firstEntry = entries[ 0 ];
	const lastEntry = entries[ entries.length - 1 ];

	switch ( metricName ) {
		case 'LCP':
			if ( lastEntry ) {
				return getNodePath( lastEntry.element );
			}
			break;
		case 'FID':
			if ( firstEntry ) {
				const { name } = firstEntry;
				// Report interactions with the `google-signin2` element as that,
				// not any of the sub-elements.
				if ( firstEntry.target.closest( '#google-signin2' ) ) {
					return `${ name }(#google-signin2)`;
				}
				return `${ name }(${ getNodePath( firstEntry.target ) })`;
			}
			break;
		case 'CLS':
			if ( entries.length ) {
				const largestShift = entries.reduce( ( a, b ) => {
					return a && a.value > b.value ? a : b;
				} );
				if ( largestShift && largestShift.sources ) {
					const largestSource = largestShift.sources.reduce( ( a, b ) => {
						return a.node &&
							a.previousRect.width * a.previousRect.height >
								b.previousRect.width * b.previousRect.height
							? a
							: b;
					} );
					if ( largestSource ) {
						return getNodePath( largestSource.node );
					}
				}
			}
			break;
		default:
			return '(not set)';
	}
}

function sendToGoogleAnalytics( { name, value, delta, id, entries } ) {
	gtag( 'event', name, {
		value: Math.round( name === 'CLS' ? delta * 1000 : delta ),
		event_category: 'Web Vitals',
		event_label: id,
		event_meta: getRating( value, vitalThresholds[ name ] ),
		event_debug: getDebugInfo( name, entries ),
		non_interaction: true,
	} );
}

export function measureWebVitals() {
	getCLS( sendToGoogleAnalytics );
	getFCP( sendToGoogleAnalytics );
	getFID( sendToGoogleAnalytics );
	getLCP( sendToGoogleAnalytics );
}

function anonymizeConfig( state ) {
	const opts = state[ `opts:${ state.viewId }` ];
	if ( opts && opts.active ) {
		return [
			`id=${ opts.metricIdDim }`,
			`name=${ opts.metricNameDim }`,
			`metrics=${ [ opts.lcpName, opts.fidName, opts.clsName ].join( ',' ) }`,
			`filters=${ opts.filters }`,
		].join( '|' );
	}
	return '(not set)';
}

export function measureReport( { state, duration, report, error } ) {
	gtag( 'event', `report_${ error ? 'error' : 'success' }`, {
		value: duration,
		report_size: report ? report.rows.length : 0,
		segments: [ state.segmentA, state.segmentB ].sort().join( ', ' ),
		config: anonymizeConfig( state ),
		event_category: 'Usage',
		event_label: error ? error.code || error.message : '(not set)',
		event_meta: report ? report.meta.source : '(not set)',
	} );
}

export function initAnalytics() {
	if ( 'undefined' === typeof window.gtag ) {
		// eslint-disable-next-line no-console
		window.gtag = console.log;
	}

	gtag( 'js', new Date() );
	gtag( ...getConfig( 'UA-XXXXXXXX-Y' ) );

	measureWebVitals();
}

( function () {
	if ( 'requestIdleCallback' in window ) {
		requestIdleCallback( initAnalytics );
	} else if ( 'complete' === document.readyState ) {
		setTimeout( initAnalytics, 5000 );
	} else {
		// eslint-disable-next-line @wordpress/no-global-event-listener
		window.addEventListener( 'load', () => {
			setTimeout( initAnalytics, 5000 );
		} );
	}
} )();
