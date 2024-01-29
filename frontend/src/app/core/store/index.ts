import { environment } from '@env';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export const effects = [];

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
