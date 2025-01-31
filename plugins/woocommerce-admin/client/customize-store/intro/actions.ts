/**
 * External dependencies
 */
import { assign, DoneInvokeEvent } from 'xstate';
import { recordEvent } from '@woocommerce/tracks';

/**
 * Internal dependencies
 */
import { customizeStoreStateMachineEvents } from '..';
import { customizeStoreStateMachineContext } from '../types';
import { ThemeCard } from './types';
import { events } from './';

export const assignThemeCards = assign<
	customizeStoreStateMachineContext,
	customizeStoreStateMachineEvents // this is actually the wrong type for the event but I still don't know how to type this properly
>( {
	intro: ( context, event ) => {
		const themeCards = (
			event as DoneInvokeEvent< { themeCards: ThemeCard[] } >
		 ).data.themeCards;
		// type coercion workaround for now
		return { ...context.intro, themeCards };
	},
} );

export const recordTracksDesignWithAIClicked = () => {
	recordEvent( 'customize_your_store_intro_design_with_ai_click' );
};

export const recordTracksThemeSelected = (
	_context: customizeStoreStateMachineContext,
	event: Extract<
		events,
		{ type: 'SELECTED_ACTIVE_THEME' | 'SELECTED_NEW_THEME' }
	>
) => {
	recordEvent( 'wcadmin_customize_your_store_intro_theme_select', {
		theme: event.payload.theme,
		is_active: event.type === 'SELECTED_ACTIVE_THEME' ? 'yes' : 'no',
	} );
};

export const recordTracksBrowseAllThemesClicked = () => {
	recordEvent( 'customize_your_store_intro_browse_all_themes_click' );
};

export const assignActiveThemeHasMods = assign<
	customizeStoreStateMachineContext,
	customizeStoreStateMachineEvents // this is actually the wrong type for the event but I still don't know how to type this properly
>( {
	intro: ( context, event ) => {
		const activeThemeHasMods = (
			event as DoneInvokeEvent< { activeThemeHasMods: boolean } >
		 ).data.activeThemeHasMods;
		// type coercion workaround for now
		return { ...context.intro, activeThemeHasMods };
	},
} );

export const assignCustomizeStoreCompleted = assign<
	customizeStoreStateMachineContext,
	customizeStoreStateMachineEvents // this is actually the wrong type for the event but I still don't know how to type this properly
>( {
	intro: ( context, event ) => {
		const customizeStoreCompleted = (
			event as DoneInvokeEvent< {
				assignCustomizeStoreCompleted: boolean;
			} >
		 ).data.assignCustomizeStoreCompleted;
		// type coercion workaround for now
		return { ...context.intro, customizeStoreCompleted };
	},
} );

export const assignFetchIntroDataError = assign<
	customizeStoreStateMachineContext,
	customizeStoreStateMachineEvents // this is actually the wrong type for the event but I still don't know how to type this properly
>( {
	intro: ( context ) => {
		return { ...context.intro, hasErrors: true };
	},
} );
