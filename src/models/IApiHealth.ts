export interface IApiHealth {
    status: TStatusString
}

type TStatusString = 'OK' | 'NOK'