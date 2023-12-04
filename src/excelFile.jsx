import * as FileSaver from "file-saver"
import * as XLSX from 'xlsx'


const ExportToExcel = ({ finalData }) => {

    console.log(finalData)
    const fileType = 'xlsx';
  
    const exportToCSV = () => {
      const sheets = {};
      
      finalData.forEach((item) => {
        const sheetName = item.category.toLowerCase();
        sheets[sheetName] = XLSX.utils.json_to_sheet(item.data);
      });
  
      const wb = { Sheets: sheets, SheetNames: finalData.map((item) => item.category.toLowerCase()) };
      const excelBuffer = XLSX.write(wb, { bookType: fileType, type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, 'MyExcelFile.xlsx');
    };
  
    return (
      <button className="btn" onClick={exportToCSV}>Export Files</button>
    );
  }
  
  export default ExportToExcel;