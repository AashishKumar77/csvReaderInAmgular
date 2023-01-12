import { Component, VERSION } from '@angular/core';
import * as XLSX from 'xlsx';
import { ContentserviceService } from '../services/contentservice.service'; 
import { HttpClient} from '@angular/common/http'; 
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  public tableData: any;
  public document = true;
  public pdf = true;
  public email = true;
  public loader = false;
  public documentGreen = false;
  public pdfGreen = false;
  public emailGreen = false;
  public tableTitle: any;
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;

constructor(private contentService:ContentserviceService) { }
  public uploadData(e:any) {
    console.log(e.target.files[0])
    const target = e.target.files[0]
    /* wire up file reader */
    // const target: DataTransfer = <DataTransfer>(<unknown>event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
      this.tableData = data;
      this.tableTitle = Object.keys(this.tableData[0]);
      this.tableRecords = this.tableData.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      this.totalPageCount = this.tableData.length / this.recordsPerPage;
    };
  }
  sendEmail(elem:any) {
    console.log("hiii", elem)
       this.email = false
      this.emailGreen = true
   }
  generateDoc(elem: any) {
    console.log(elem,"====jj")
    // const json = {"mailtemaplteName":"","data":[{"Self-employeed_Other_Option":"","Primary_address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","app2_country":"","Apartment_No":"404","Business_Owner":"","app2_email":"","Gstin":"9ABFFA5826L1Z3","Booking_Source_Remark":"","Unit_Flat_Number":"D-421","DOB":"2023-01-09","Channel_Partner_Name":"","Mobile_No1":"","app2_mobile":"","app2_adress_full":"","Joint_Applicant":"NO","Decla_Name_of_the_Applicant":"Amin Khalipe","Is_Joint":"NO","app2_name":"","Country":"India","Corr_Pin":"100000","Cheque_Number":"123545","Bank":"Central Bank Of India","SELF_DECLARATION_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Ack_Received_From":"Amin Khalipe","Pin_Code":"100000","Unit_Apartment_Number":"404","Carpet_Area":"1200sqr","Unit_Parking_Requested":"Yes","Corr_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Home_Town":"c","LandLine_No":"62181206","Land_Line":"62181206","Designation":"Manager","Unit_Agreement_Value_In_Word":"Ten Lacs","Booking_In_Favour_Of":"L&T","Mother_Tounge":"Hindi","Booking_Cheque_Number":"123545","Booking_Bank":"Central Bank Of India","Nationality":"Resident Indian","Office_Address":"c","Email":"akhalipe@yahoo.co.in","RERA":"","Unit_Booking_Amount":"100000","Unit_Booking_Rupees_in_Words":"one Lacs","Project_Name":"","Flat_No":"D-421","Parking_Requested":"Yes","Date_8":"2023-01-09","Date_5":"","Date_6":"","Date_3":"","Date_4":"","Date_1":"","app2_pan":"","Date_2":"","app2_pin":"","Unit_Carpet_Area":"1200sqr","Agriment_Value":"1000000","app2_lanline":"","Corr_State":"","Occuation_Salaried_Employee_With":"Service","Name_of_the_Applicant":"Amin Khalipe","UID_Aadhaar":"258574883196","State":"Nagaland","Corr_Country":"India","Unit_Building_Number":"M-Tech Homes Chs","District":"cc","CRN":"M-Tech Homes Chs","Rupees_in_Words1":"Ten Lacs","Marital_Status":"","Rupees_in_Words":"one Lacs","Permanent_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Sign_4":"","Sign_5":"","Sign_2":"","Sign_3":"","Sign_8":"","Ack_Name_of_the_Applicant":"Amin Khalipe","Sign_9":"","Sign_6":"","Sign_7":"","Sign_1":"","Mobile_No":"918976572375","Building_No":"M-Tech Homes Chs","Building_Name":"M-Tech Homes Chs","Primary_Image":"M-Tech Homes Chs","app2_state":"","ACKNOWLEDGEMENT_Cheque_Number":"123545","app2_adhar":"","Pan_No":"ASYPK4152F","Remark_last":"cc","Channel_Partner_Organisation":"","Uni_Ancillary_Area":"400sqr","app2_nationality":"","Unit_Building_No":"M-Tech Homes Chs","Unit_Agreement_Value":"1000000","ACKNOWLEDGEMENT_Amount":"100000","BOOKING_SOURCE_Please_Specify":""}],"AttachtempalteType":"TemplateLibrary","MailtempId":0,"Type":"Generation","whatsappId":0,"templateName":"LNTDemoPoc","smstempId":0,"customerId":"cus100607","lgtype":"null","Id":"805","whatsapptempName":"","applicationtype":"doctiger","smstemapName":"","adminEmail":"bizlemdemo@gmail.com","group":""}
    this.contentService.generateDoc(elem).subscribe(resp => {
      console.log(resp,"===resp")
      this.document = false
      this.documentGreen = true
      var split = resp?.docurl.split('.')
      var doc = split[0] + "." + split[1] + "." + split[2] + ".docx";
       window.open(doc);
    })

  }

 
  generatePdf(elem: any) {
    
     const lowercaseKeys = (obj:any) =>
       Object.keys(obj).reduce((acc:any, key) => {
         acc[key.toString()] = obj[key];
      return acc;
  }, {});
    const myObjLower = lowercaseKeys(elem);
    const json = {"mailtemaplteName":"","data":[{"Self-employeed_Other_Option":"","Primary_address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","app2_country":"","Apartment_No":"404","Business_Owner":"","app2_email":"","Gstin":"9ABFFA5826L1Z3","Booking_Source_Remark":"","Unit_Flat_Number":"D-421","DOB":"2023-01-09","Channel_Partner_Name":"","Mobile_No1":"","app2_mobile":"","app2_adress_full":"","Joint_Applicant":"NO","Decla_Name_of_the_Applicant":"Amin Khalipe","Is_Joint":"NO","app2_name":"","Country":"India","Corr_Pin":"100000","Cheque_Number":"123545","Bank":"Central Bank Of India","SELF_DECLARATION_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Ack_Received_From":"Amin Khalipe","Pin_Code":"100000","Unit_Apartment_Number":"404","Carpet_Area":"1200sqr","Unit_Parking_Requested":"Yes","Corr_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Home_Town":"c","LandLine_No":"62181206","Land_Line":"62181206","Designation":"Manager","Unit_Agreement_Value_In_Word":"Ten Lacs","Booking_In_Favour_Of":"L&T","Mother_Tounge":"Hindi","Booking_Cheque_Number":"123545","Booking_Bank":"Central Bank Of India","Nationality":"Resident Indian","Office_Address":"c","Email":"akhalipe@yahoo.co.in","RERA":"","Unit_Booking_Amount":"100000","Unit_Booking_Rupees_in_Words":"one Lacs","Project_Name":"","Flat_No":"D-421","Parking_Requested":"Yes","Date_8":"2023-01-09","Date_5":"","Date_6":"","Date_3":"","Date_4":"","Date_1":"","app2_pan":"","Date_2":"","app2_pin":"","Unit_Carpet_Area":"1200sqr","Agriment_Value":"1000000","app2_lanline":"","Corr_State":"","Occuation_Salaried_Employee_With":"Service","Name_of_the_Applicant":"Amin Khalipe","UID_Aadhaar":"258574883196","State":"Nagaland","Corr_Country":"India","Unit_Building_Number":"M-Tech Homes Chs","District":"cc","CRN":"M-Tech Homes Chs","Rupees_in_Words1":"Ten Lacs","Marital_Status":"","Rupees_in_Words":"one Lacs","Permanent_Address":"702 M-Tech Homes Chs Plot 69/2 Sector 27, Nerul (East) Navi Mumbai Maharashtra 400706 India","Sign_4":"","Sign_5":"","Sign_2":"","Sign_3":"","Sign_8":"","Ack_Name_of_the_Applicant":"Amin Khalipe","Sign_9":"","Sign_6":"","Sign_7":"","Sign_1":"","Mobile_No":"918976572375","Building_No":"M-Tech Homes Chs","Building_Name":"M-Tech Homes Chs","Primary_Image":"M-Tech Homes Chs","app2_state":"","ACKNOWLEDGEMENT_Cheque_Number":"123545","app2_adhar":"","Pan_No":"ASYPK4152F","Remark_last":"cc","Channel_Partner_Organisation":"","Uni_Ancillary_Area":"400sqr","app2_nationality":"","Unit_Building_No":"M-Tech Homes Chs","Unit_Agreement_Value":"1000000","ACKNOWLEDGEMENT_Amount":"100000","BOOKING_SOURCE_Please_Specify":""}],"AttachtempalteType":"TemplateLibrary","MailtempId":0,"Type":"Generation","whatsappId":0,"templateName":"LNTDemoPoc","smstempId":0,"customerId":"cus100607","lgtype":"null","Id":"805","whatsapptempName":"","applicationtype":"doctiger","smstemapName":"","adminEmail":"bizlemdemo@gmail.com","group":""}
    console.log(myObjLower, "====myObjLower")
    setTimeout(() => {
       this.contentService.generateDoc(myObjLower).subscribe(resp => {
       console.log(resp,"====resp")
        this.pdf = false
      this.pdfGreen = true
       window.open(resp?.docurl);
    })
    },500)
   
  }
  onPageChange() {
    this.pageStartCount = this.currentPage * this.recordsPerPage;
    this.pageEndCount = this.pageStartCount + this.recordsPerPage;
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
  }
}
