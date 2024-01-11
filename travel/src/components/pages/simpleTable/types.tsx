export interface ISimpleTable{
    header: string,
    properties : ISimpleTableProperty[],
    values : any,
    details? : any
}

interface ISimpleTableProperty{
    fieldName : string,
    propertyName : string
}