import XLSX from "xlsx";

export class ExcelHelper{
    static readExcel(filepath:string,sheetName?:string):Record<string,string>[]{
        const workbook =XLSX.readFile(filepath);
        const sheet =workbook.Sheets[sheetName||workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json<Record<string,string>>(sheet);
    }
}