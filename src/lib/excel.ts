// import * as xlsx from "xlsx";

// export async function extractDataFromExcel(file: FormDataEntryValue) {
//   try {
//     const arrayBuffer = await new Response(file).arrayBuffer();
//     const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet);
//     return data;
//   } catch (error) {
//     console.error("[EXTRACT_DATA_FROM_EXCEL]", error);
//     return null;
//   }
// }
