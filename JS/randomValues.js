/* ---------------------------------------------------------------------- Arrays for hl7Buttons function ----------------------------------------------------- */
var msh = ["MSH", "adtMSH", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var evn = ["EVN", "adtEVN", "", "", "", "", ""];
var pid = ["PID", "adtPID", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var pv1 = ["PV1", "adtPV1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var al1 = ["AL1", "adtAL1", "", "", "", ""];
var gt1 = ["GT1", "adtGT1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var in1 = ["IN1", "adtIN1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var dg1 = ["DG1", "adtDG1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
/* ----------------------------------------------------------------------- END ------------------------------------------------------------------------------- */

/* selectedArray consist of segment arrays required for ADT messages and is used in hl7Buttons function, Select preferred fields button and Select all button */
var selectedArray = [msh, evn, pid, pv1, al1, gt1, in1, dg1];
/* ----------------------------------------------------------------------- END ------------------------------------------------------------------------------ */

$(document).ready(function () {
  $('[data-toggle="popover"]').popover(); //used for Copy to clipboard
  $('[data-toggle="tooltip"]').tooltip(); // enabling bootstrap toggle style

  /* ----------------------------- START loop Calls hl7Buttons and sends the segments to generate the fields buttons at front end ---------------------------------------------- */
  for (var i = 0; i < selectedArray.length; i++) {
    hl7Buttons(selectedArray[i]);
  }
  /* ----------------------------- END loop Calls hl7Buttons and sends the segments to generate the fields buttons at front end ---------------------------------------------- */

  /* --------------------------------------- START loop for Checking, Highlighting and disabling the buttons for the mandatory HL7 fields ------------------------------------ */
  for (var i = 0; i < mandatoryFields.length; i++) {
    $("." + mandatoryFields[i]).addClass('disabled'); //Label tag button class to disable the mandatory fields
    $("#" + mandatoryFields[i]).attr('checked', true); //Checkbox tag id to add checked attribute the mandatory fields
  }
  /* --------------------------------------- END loop for Checking, Highlighting and disabling the buttons for the mandatory HL7 fields ------------------------------------ */

  /* --------------------------------------- START loop for hiding the fields not supported ------------------------------------ */
  for (var i = 0; i < notUsedFields.length; i++) {
    $("." + notUsedFields[i]).addClass('hiddenFields'); //Adding class to identify the hidden fields and is used in click function for select all button
    $("." + notUsedFields[i]).hide(); //Hiding the fields which we are not using
  }
  /* --------------------------------------- END loop for hiding the fields not supported ------------------------------------ */
});

/*-----------------------------------------------------START Functions to generate buttons in HTML class adtmessage ------------------------------------------------------------------*/
function hl7Buttons(segments) {
  for (var i = 0; i < segments.length; i++) {
    var buttons = $(
      '<label class="btn btn-secondary hl7-btn ' + segments[0] + (i + 1) + '"><input id="' + segments[0] + (i + 1) + '" class="' + segments[0] + "Buttons " + 'd-none" type="checkbox" value="' + i + '">' + segments[0] + "." + (i + 1) + "</label>"
    );
    buttons.appendTo("#" + segments[1]); //To display buttons on the respective div tags
  }
}
/*-----------------------------------------------------END Functions to generate buttons in HTML class adtmessage------------------------------------------------------------------*/

/*---------------------------------------------------------START Function to select preferred fields----------------------------------------------------------------------*/
$("#preferred-fields").click(function () {
  for (var i = 0; i < selectedArray.length; i++) {
    for (var j = 0; j < selectedArray[i].length; j++) {
      if (!$("." + selectedArray[i][0] + (j + 1)).hasClass("disabled")) { // filtering the mandatory fields by checking the .disabled class
        $("." + selectedArray[i][0] + (j + 1)).removeClass('active'); //Removing active class from the filtered label tag
        $("#" + selectedArray[i][0] + (j + 1)).attr('checked', false); //Unchecking all the filtered checkbox
      }
    }
  }
  //Loop for selecting the preferred fields
  for (var i = 0; i < preferredFields.length; i++) {
    $("#" + preferredFields[i]).attr('checked', true);
    $("." + preferredFields[i]).addClass('active');
  }
});
/*---------------------------------------------------------END Function to select preferred fields----------------------------------------------------------------------*/

/*---------------------------------------------------------START Function to select all fields----------------------------------------------------------------------*/
$("#select-all").click(function () {
  for (var i = 0; i < selectedArray.length; i++) {
    for (var j = 0; j < selectedArray[i].length; j++) {
      if (!($("." + selectedArray[i][0] + (j + 1)).hasClass("disabled") || $("." + selectedArray[i][0] + (j + 1)).hasClass("hiddenFields"))) {
        $("." + selectedArray[i][0] + (j + 1)).addClass('active'); //Label tag button class to disable the mandatory fields
        $("#" + selectedArray[i][0] + (j + 1)).attr('checked', true);
      }
    }
  }
});
/*---------------------------------------------------------END Function to select all fields----------------------------------------------------------------------*/

/*---------------------------------------------------------START Function to select all fields----------------------------------------------------------------------*/
$("#reset-btn").click(function () {
  for (var i = 0; i < selectedArray.length; i++) {
    for (var j = 0; j < selectedArray[i].length; j++) {
      if (!$("." + selectedArray[i][0] + (j + 1)).hasClass("disabled")) {
        $("." + selectedArray[i][0] + (j + 1)).removeClass('active'); //Label tag button class to disable the mandatory fields
        $("#" + selectedArray[i][0] + (j + 1)).attr('checked', false);
      }
    }
  }
});
/*---------------------------------------------------------END Function to select all fields----------------------------------------------------------------------*/

var arr = [];
var zip = new JSZip();
//Current Date Time
var x = new Date();
var yyyy = x.getFullYear().toString();
var mm = (x.getMonth() + 1).toString();
var dd = x.getDate().toString();
var hh = x.getHours().toString();
var mins = x.getMinutes().toString();
var ss = x.getSeconds().toString();
dd.length == 1 && (dd = "0" + dd);
mm.length == 1 && (mm = "0" + mm);
hh.length == 1 && (hh = "0" + hh);
mins.length == 1 && (mins = "0" + mins);
ss.length == 1 && (ss = "0" + ss);


$("#downloadADT-btn").click(function () {
  var mshCheckedFields = [],
    evnCheckedFields = [],
    pidCheckedFields = [],
    pv1CheckedFields = [],
    al1CheckedFields = [],
    dg1CheckedFields = [],
    gt1CheckedFields = [],
    in1CheckedFields = [],
    checkedMessageType = [];
  var cloned_msh = ["MSH", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var cloned_evn = ["\nEVN", "", "", "", "", "", ""];
  var cloned_pid = ["\nPID", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var cloned_pv1 = ["\nPV1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var cloned_al1 = ["\nAL1", "", "", "", "", ""];
  var cloned_gt1 = ["\nGT1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var cloned_in1 = ["\nIN1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  var cloned_dg1 = ["\nDG1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; //21


  /* ------------------------------------------------------------------ START Checked MSH Fields ----------------------------------------------------------------- */
  $('.MSHButtons:checked').each(function () {
    mshCheckedFields.push($(this).val());
  });
  /* ------------------------------------------------------------------ END Checked MSH Fields ----------------------------------------------------------------- */
  /* ------------------------------------------------------------------ START Checked EVN Fields ----------------------------------------------------------------- */
  $('.EVNButtons:checked').each(function () {
    evnCheckedFields.push($(this).val());
  });
  //console.log(evnCheckedFields);
  /* ------------------------------------------------------------------ END Checked EVN Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked PID Fields ----------------------------------------------------------------- */
  $('.PIDButtons:checked').each(function () {
    pidCheckedFields.push($(this).val());
  });
  //console.log(pidCheckedFields);
  /* ------------------------------------------------------------------ END Checked PID Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked PV1 Fields ----------------------------------------------------------------- */
  $('.PV1Buttons:checked').each(function () {
    pv1CheckedFields.push($(this).val());
  });
  //console.log(pv1CheckedFields);
  /* ------------------------------------------------------------------ END Checked PV1 Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked AL1 Fields ----------------------------------------------------------------- */
  $('.AL1Buttons:checked').each(function () {
    al1CheckedFields.push($(this).val());
  });
  //console.log(al1CheckedFields);
  /* ------------------------------------------------------------------ END Checked AL1 Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked DG1 Fields ----------------------------------------------------------------- */
  $('.DG1Buttons:checked').each(function () {
    dg1CheckedFields.push($(this).val());
  });
  //console.log(dg1CheckedFields);
  /* ------------------------------------------------------------------ END Checked DG1 Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked GT1 Fields ----------------------------------------------------------------- */
  $('.GT1Buttons:checked').each(function () {
    gt1CheckedFields.push($(this).val());
  });
  //console.log(gt1CheckedFields);
  /* ------------------------------------------------------------------ END Checked GT1 Fields ----------------------------------------------------------------- */

  /* ------------------------------------------------------------------ START Checked IN1 Fields ----------------------------------------------------------------- */
  $('.IN1Buttons:checked').each(function () {
    in1CheckedFields.push($(this).val());
  });
  //console.log(in1CheckedFields);
  /* ------------------------------------------------------------------ END Checked IN1 Fields ----------------------------------------------------------------- */
  /* ------------------------------------------------------------------ START Checked Message Type ----------------------------------------------------------------- */
  $('.messageTypeButtons:checked').each(function () {
    checkedMessageType.push($(this).val());
  });
  //console.log(checkedMessageType);
  /* ------------------------------------------------------------------ END Checked Message Type ----------------------------------------------------------------- */

  var incr = $('#messagecount').val();
  for (var i = 0; i < incr; i++) {
    var checkedArrays = [mshCheckedFields, evnCheckedFields, pidCheckedFields, pv1CheckedFields, al1CheckedFields, gt1CheckedFields, in1CheckedFields, dg1CheckedFields]; // Array with positions of the checked fields
    var clonedArrays = [cloned_msh, cloned_evn, cloned_pid, cloned_pv1, cloned_al1, cloned_gt1, cloned_in1, cloned_dg1]; // Empty array to be filled with the selected values
    var yyyymmdd = yyyy + mm + dd + hh + mm + ss;

    var random_message_type = checkedMessageType[(Math.random() * checkedMessageType.length) | 0];
    var message_control_id = Math.floor(Math.random() * (10 - 10000 + 1)) + 10000;
    var pid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
    var event_reason_code = eventReasonCodeArray[(Math.random() * eventReasonCodeArray.length) | 0];
    var patient_name = firstname[(Math.random() * firstname.length) | 0] + "^" + middlename[(Math.random() * lastname.length) | 0] + "^" + lastname[(Math.random() * lastname.length) | 0];
    var date_of_birth = (x.getFullYear() - 20).toString() + mm + dd + hh + mm + ss;
    var mother_maiden_name = motherMaidenNameArray[(Math.random() * motherMaidenNameArray.length) | 0];
    var gender = "";
    $('.gender:checked').each(function () {
      gender += $(this).val();
    });
    if (gender == "Random") {
      gender = genderarray[Math.floor(Math.random() * genderarray.length)];
    }
    var alias = firstname[(Math.random() * firstname.length) | 0];
    var race = raceArray[Math.floor(Math.random() * raceArray.length)];
    var address = addr[(Math.random() * addr.length) | 0];
    var country_code = countryCodeArray[(Math.random() * countryCodeArray.length) | 0];
    var phone_number_home = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var phone_number_business = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var primary_language = primaryLanguageArray[(Math.random() * primaryLanguageArray.length) | 0];
    var marital_status = maritalStatusArray[(Math.random() * maritalStatusArray.length) | 0];
    var religion = religionArray[(Math.random() * religionArray.length) | 0];
    var visit = pid + "VZ5097";
    var ssn = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000;
    var driver_license_number = Math.floor(Math.random() * (10000000000 - 1000000000 + 1)) + 1000000000;
    var ethnicity = ethnicityArray[(Math.random() * ethnicityArray.length) | 0];
    var birth_place = birthPlaceArray[(Math.random() * birthPlaceArray.length) | 0];
    var multiple_birth_indicator_and_order = birthIndicatorArray[(Math.random() * birthIndicatorArray.length) | 0];
    var citizenship = citizenshipArray[(Math.random() * citizenshipArray.length) | 0];
    var death_indicator = deathIndicatorArray[(Math.random() * deathIndicatorArray.length) | 0];
    var patientClassArray = [];
    //Patient Class Checkbox
    $('.patient_class:checked').each(function () {
      patientClassArray.push($(this).val());
    });
    if (jQuery.inArray("Random", patientClassArray) == -1) {
      var patient_type = patientClassArray[(Math.random() * patientClassArray.length) | 0];
      var patient_class = patient_type.charAt(0);
    } else {
      var patient_type = patientClassArray[(Math.random() * patientClassArray.length) | 0];
      var patient_class = patient_type.charAt(0);
    }
    var assigned_patient_location = points_of_care[(Math.random() * points_of_care.length) | 0] + "^" + Math.floor(Math.random() * (100 - 121 + 1)) + 121 + "^" + "^" + "^" + "^" + "^" + "^" + "^" + department[(Math.random() * department.length) | 0];
    var admission_type = admissionTypeArray[(Math.random() * admissionTypeArray.length) | 0];
    var provider = (Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000) + "^" + lastname[(Math.random() * lastname.length) | 0] + "^" + middlename[(Math.random() * lastname.length) | 0]; //ORC.12 and OBR16
    var hospital_service = hospitalServiceArray[(Math.random() * hospitalServiceArray.length) | 0];
    var discharge_disposition = dischargeDispositionArray[(Math.random() * dischargeDispositionArray.length) | 0];
    var bed_status = bedStatusArray[(Math.random() * bedStatusArray.length) | 0];
    var other_healthcare_provider = (Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000) + "^" + lastname[(Math.random() * lastname.length) | 0] + "^" + middlename[(Math.random() * lastname.length) | 0];
    var allergen_type_code = allergenTypeCodeArray[(Math.random() * allergenTypeCodeArray.length) | 0];
    var allergen_code = allergenCodeArray[(Math.random() * allergenCodeArray.length) | 0];
    var allergy_severity_code = allergySeverityCodeArray[(Math.random() * allergySeverityCodeArray.length) | 0];
    var diagnosis_code = diagnosisCodeArray[(Math.random() * diagnosisCodeArray.length) | 0];
    var diagnosis_type = diagnosisTypeArray[(Math.random() * diagnosisTypeArray.length) | 0];
    var diagnosis_priority = diagnosisPriorityArray[(Math.random() * diagnosisTypeArray.length) | 0];
    var guarantor_name = firstname[(Math.random() * firstname.length) | 0] + "^" + middlename[(Math.random() * lastname.length) | 0] + "^" + lastname[(Math.random() * lastname.length) | 0];
    var guarantor_number_home = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var guarantor_number_business = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var guarantor_relationship = relationshipArray[(Math.random() * relationshipArray.length) | 0];
    var guarantor_ssn = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000;
    var contact_person_name = firstname[(Math.random() * firstname.length) | 0] + "^" + middlename[(Math.random() * lastname.length) | 0] + "^" + lastname[(Math.random() * lastname.length) | 0];
    var contact_person_number = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var contact_relationship = relationshipArray[(Math.random() * relationshipArray.length) | 0];
    var insurance_id_plan_and_company_name = insuranceIdPlanAndCompanyNameArray[(Math.random() * insuranceIdPlanAndCompanyNameArray.length) | 0];
    var insurance_company_address = addr[(Math.random() * addr.length) | 0];
    var insurance_co_phone_number = "(" + Math.floor(Math.random() * (999 - 100 + 1) + 100) + ") " + Math.floor(Math.random() * (999 - 100 + 1) + 100) + "-" + Math.floor(1000 + Math.random() * 9000);
    var plan_type = planTypeArray[(Math.random() * planTypeArray.length) | 0];

    var mshSelected = ["MSH", "^~/&", "CITIUSTECH", "HOSPITAL", "INTERFACE", "HOSPITALID", yyyymmdd, "", random_message_type, message_control_id + "M2210", "T", "2.7", "", "", "", "", "", "", "", ""];
    var evnSelected = ["\nEVN|" + random_message_type, yyyymmdd, yyyymmdd, event_reason_code, "Operator ID", yyyymmdd, "Event Facility"];
    var pidSelected = ["\nPID|1", pid, pid, pid, patient_name, mother_maiden_name, date_of_birth, gender, alias, race, address, country_code, phone_number_home, phone_number_business, primary_language, marital_status, religion, visit, ssn, driver_license_number, "Mother's Identifier", ethnicity, birth_place, multiple_birth_indicator_and_order, "", citizenship, "Veterans Military Status", citizenship, (x.getFullYear() + 2).toString() + mm + dd + hh + mm + ss, death_indicator, "Identity Unknown Indicator", "Identity Reliability Code", "Last Update Date/Time", "Last Update Facility", "Species Code", "Breed Code", "Strain", "Production Class Code", "Tribal Citizenship"];
    var pv1Selected = ["\nPV1|1", patient_class, assigned_patient_location, admission_type, "Preadmit Number", "Prior Patient Location", provider, provider, provider, hospital_service, "Temporary Location", "Preadmit Test Indicator", "Re-admission Indicator", "Admit Source", "Ambulatory Status", "VIP Indicator", provider, patient_type, visit, "Financial Class", "Charge Price Indicator", "Courtesy Code", "Credit Rating", "Contract Code", "Contract Effective Date", "Contract Amount", "Contract Period", "Interest Code", "Transfer to Bad Debt Code", "Transfer to Bad Debt Date", "Bad Debt Agency Code", "Bad Debt Transfer Amount", "Bad Debt Recovery Amount", "Delete Account Indicator", "Delete Account Date", discharge_disposition, "Discharged to Location", "Diet Type", "Servicing Facility", bed_status, "Account Status", "Pending Location", "Prior Temporary Location", yyyymmdd, yyyy + mm + (x.getDate() + 1).toString() + hh + mm + ss, "Current Patient Balance", "Total Charges", "Total Adjustments", "Total Payments", "Alternate Visit ID", "Visit Indicator", other_healthcare_provider];
    var al1Selected = ["\nAL1|1", allergen_type_code, allergen_code, allergy_severity_code, "Allergy Reaction Code", yyyymmdd];
    var gt1Selected = ["\nGT1|1", "Guarantor Number", guarantor_name, "Guarantor Spouse Name", address, guarantor_number_home, guarantor_number_business, (x.getFullYear() + -25).toString() + mm + (x.getDate() + 5).toString() + hh + mm + ss, gender, "Guarantor Type", guarantor_relationship, guarantor_ssn, "Guarantor Date - Begin", "Guarantor Date - End", "Guarantor Priority", "Guarantor Employer Name", "Guarantor Employer Address", "Guarantor Employer Phone Number", "Guarantor Employee ID Number", "Guarantor Employment Status", "Guarantor Organization Name", "Guarantor Billing Hold Flag", "Guarantor Credit Rating Code", "Guarantor Death Date And Time", "Guarantor Death Flag", "Guarantor Charge Adjustment Code", "Guarantor Household Annual Income", "Guarantor Household Size", "Guarantor Employer ID Number", "Guarantor Marital Status Code", "Guarantor Hire Effective Date", "Employment Stop Date", "Living Dependency", "Ambulatory Status", "Citizenship", "Primary Language", "Living Arrangement", "Publicity Code", "Protection Indicator", "Student Indicator", "Religion", "Mother's Maiden Name", "Nationality", "Ethnic Group", contact_person_name, contact_person_number, "Contact Reason", contact_relationship, "Job Title", "Job Code/Class", "Guarantor Employer's Organization Name", "Handicap", "Job Status", "Guarantor Financial Class", "Guarantor Race", "Guarantor Birth Place", "VIP Indicator"];
    var in1Selected = ["\nIN1|1", insurance_id_plan_and_company_name, "", "", insurance_company_address, "Insurance Co Contact Person", insurance_co_phone_number, "Group Number", "Group Name", "Insured's Group Emp ID", "Insured's Group Emp Name", (x.getFullYear() - 15).toString() + mm + dd + hh + mm + ss, "Plan Expiration Date", "Authorization Information", plan_type, patient_name, "Self", date_of_birth, address, "Assignment Of Benefits", "Coordination Of Benefits", "1", "Notice Of Admission Flag", "Notice Of Admission Date", "Report Of Eligibility Flag", "Report Of Eligibility Date", "Release Information Code", "Pre-Admit Cert", "Verification Date/Time", "Verification By", "Type Of Agreement Code", "Billing Status", "Lifetime Reserve Days", "Delay Before L.R. Day", "Company Plan Code", "Policy Number", "Policy Deductible", "Policy Limit - Amount", "Policy Limit - Days", "Room Rate - Semi-Private", "Room Rate - Private", "Insured's Employment Status", gender, "Insured's Employer's Address", "Verification Status", "Prior Insurance Plan ID", "Coverage Type", "Handicap", "Insured's ID Number", "Signature Code", "Signature Code Date", "Insured_s Birth Place", "VIP Indicator"];
    var dg1Selected = ["\nDG1|1", "I10", diagnosis_code, "", yyyy + mm + dd + hh + mm + ss, diagnosis_type, "Major Diagnostic Category", "Diagnostic Related Group", "DRG Approval Indicator", "DRG Grouper Review Code", "Outlier Type", "Outlier Days", "Outlier Cost", "Grouper Version And Type", diagnosis_priority, "Diagnosing Clinician", "Diagnosis Classification", "Confidential Indicator", "Attestation Date/Time", "Diagnosis Identifier", "Diagnosis Action Code"];

    var selectedFinalArray = [mshSelected, evnSelected, pidSelected, pv1Selected, al1Selected, gt1Selected, in1Selected, dg1Selected];

    for (var j = 0; j < selectedFinalArray.length; j++) {
      for (var k = 0; k < checkedArrays[j].length; k++) {
        clonedArrays[j].splice(checkedArrays[j][k], 1, selectedFinalArray[j][checkedArrays[j][k]]);
      }
    }

    for (var j = 0; j < selectedFinalArray.length; j++) {
      for (var k = 0; k < clonedArrays[j].length; k++) {
        arr.push(clonedArrays[j][k].toString() + "|");
      }
    }
    zip.add("ADT " + (i + 1) + ".txt", arr.join(""));
    arr = [];
  }
  content = zip.generate();
  location.href = "data:application/zip;base64," + content;
});

function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("copy");
  }
}
//Restrict Count limit
$("#messagecount").on("keypress", function (e) {
  var currentValue = String.fromCharCode(e.which);
  var finalValue = $(this).val() + currentValue;
  if (finalValue > 2000) {
    e.preventDefault();
  }
});
//Display Message Count
var showcount = function (val) {
  document.getElementById("messagecount").value = parseInt(val);
};

$(".pop")
  .popover()
  .click(function () {
    setTimeout(function () {
      $(".pop").popover("hide");
    }, 500);
  });