import axios from 'axios'
import { API_ROUTES } from 'utils/constants'
import {
  setAnalyticsData,
  setSalesGraphData,
  setSalesGraphLoading,
} from 'redux-store/analytics.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'

export const getAnalyticsData = async (
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  try {
    const response = await axios.get(API_ROUTES.ANALYTICS_REPORTS)

    dispatch(setAnalyticsData(response.data))
  } catch (err) {}
}

export const getDailySalesgraph = async (
  month: string,
  year: number,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(
      API_ROUTES.ANALYTICS_MONTHLY_SALES_GRAPH,
      {
        year,
        month,
      },
    )
    dispatch(setSalesGraphLoading(false))

    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}

export const getMonthlySalesgraph = async (
  year: number,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(
      API_ROUTES.ANALYTICS_MONTHLY_SALES_GRAPH,
      {
        year,
      },
    )
    dispatch(setSalesGraphLoading(false))

    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}

export const getYearlySalesgraph = async (
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(API_ROUTES.ANALYTICS_YEARLY_SALES_GRAPH)
    dispatch(setSalesGraphLoading(false))
    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}
