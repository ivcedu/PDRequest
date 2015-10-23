// get DB //////////////////////////////////////////////////////////////////////
function db_getAdministrator(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdministrator.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getLogin(LoginEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getLogin.php",
        data:{LoginEmail:LoginEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getLoginByID(LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getLoginByID.php",
        data:{LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActState() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActState.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActStateByID(ActStateID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActStateByID.php",
        data:{ActStateID:ActStateID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActStateByState(State) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActStateByState.php",
        data:{State:State},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceType() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceType.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceTypeID(ResourceType) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getResourceTypeID.php",
        data:{ResourceType:ResourceType},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getResourceTypeByID(ResourceTypeID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getResourceTypeByID.php",
        data:{ResourceTypeID:ResourceTypeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDSystem(ApplyDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDSystem.php",
        data:{ApplyDate:ApplyDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDSystemApplyDateList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDSystemApplyDateList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDSystemByApplyDate(ApplyDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDSystemByApplyDate.php",
        data:{ApplyDate:ApplyDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestList(LoginID, TermStart, TermEnd) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestList.php",
        data:{LoginID:LoginID, TermStart:TermStart, TermEnd:TermEnd},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestListActive(LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestListActive.php",
        data:{LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestListUserHistory(LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestListUserHistory.php",
        data:{LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestAdminList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestAdminList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequest(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequest.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestByActTitle(ActTitle, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestByActTitle.php",
        data:{ActTitle:ActTitle, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqUserInfo(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqUserInfo.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDJustArea(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDJustArea.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getNarrative(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getNarrative.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getNarrativeAttach(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getNarrativeAttach.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPAReqInfo1(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPAReqInfo1.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPAReqInfo1Attach(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPAReqInfo1Attach.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPAReqInfo2(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPAReqInfo2.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPAReqInfo2Attach(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPAReqInfo2Attach.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqHours(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqHours.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqReimb(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqReimb.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqReimbByLogin(LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqReimbByLogin.php",
        data:{LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatus(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatus.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqStep(PDReqStepID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqStep.php",
        data:{PDReqStepID:PDReqStepID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTransaction(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTransaction.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getLogHistory(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getLogHistory.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeekList(TermStart, TermEnd) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeekList.php",
        data:{TermStart:TermStart, TermEnd:TermEnd},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeekList2(LoginID, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeekList2.php",
        data:{LoginID:LoginID, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeekListAdmin(TermStart, TermEnd) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeekListAdmin.php",
        data:{TermStart:TermStart, TermEnd:TermEnd},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeek(AvailFlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeek.php",
        data:{AvailFlexWeekID:AvailFlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFWJustArea(AvailFlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFWJustArea.php",
        data:{AvailFlexWeekID:AvailFlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekList(LoginID, TermStart, TermEnd) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekList.php",
        data:{LoginID:LoginID, TermStart:TermStart, TermEnd:TermEnd},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekListUserHistory(LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekListUserHistory.php",
        data:{LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeek(FlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeek.php",
        data:{FlexWeekID:FlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeek2(AvailFlexWeekID, LoginID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeek2.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, LoginID:LoginID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekByAFWID(AvailFlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekByAFWID.php",
        data:{AvailFlexWeekID:AvailFlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekUserInfo(FlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekUserInfo.php",
        data:{FlexWeekID:FlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFWJustArea(FlexWeekID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFWJustArea.php",
        data:{FlexWeekID:FlexWeekID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailPDRequestByID(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailPDRequestByID.php",
         data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailPDRequestList(TermStart, TermEnd) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailPDRequestList.php",
         data:{TermStart:TermStart, TermEnd:TermEnd},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getChancellorFlexWeek(StartDate, EndDate, EType, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getChancellorFlexWeek.php",
        data:{StartDate:StartDate, EndDate:EndDate, EType:EType, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekDetail(StartDate, EndDate, FWJustID, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekDetail.php",
        data:{StartDate:StartDate, EndDate:EndDate, FWJustID:FWJustID, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDTrackingDoc(StartDate, EndDate, EType, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDTrackingDoc.php",
        data:{StartDate:StartDate, EndDate:EndDate, EType:EType, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTracDoc(TracDocID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTracDoc.php",
        data:{TracDocID:TracDocID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestFiscalYrs() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestFiscalYrs.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeekFiscalYrs() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeekFiscalYrs.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestListDeleted() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestListDeleted.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekListByFiscalYrs(LoginID, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekListByFiscalYrs.php",
        data:{LoginID:LoginID, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailFlexWeekListAdminByFiscalYrs(FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailFlexWeekListAdminByFiscalYrs.php",
        data:{FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailPDRequestFiscalYrs() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailPDRequestFiscalYrs.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAvailPDRequestListByFiscalYrs(FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAvailPDRequestListByFiscalYrs.php",
        data:{FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFlexWeekFiscalYrs() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFlexWeekFiscalYrs.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDRequestListByFiscalYrs(LoginID, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDRequestListByFiscalYrs.php",
        data:{LoginID:LoginID, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqReimbByLoginFiscalYrs(LoginID, FiscalYrs) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqReimbByLoginFiscalYrs.php",
        data:{LoginID:LoginID, FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqHRProcess(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqHRProcess.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqHRProcessLog(PDRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqHRProcessLog.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcTypeAll() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcTypeAll.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcTypeActiveList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcTypeActiveList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcTypeDescrip(FundSrcTypeID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcTypeDescrip.php",
        data:{FundSrcTypeID:FundSrcTypeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqFundSrc(PDRequestID, PDReqReimbID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqFundSrc.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqFundSrcPrintView(PDRequestID, PDReqReimbID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqFundSrcPrintView.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqFundSrcFSSelected(PDRequestID, PDReqReimbID, FundSrcTypeID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqFundSrcFSSelected.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID, FundSrcTypeID:FundSrcTypeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPDReqFSComments(PDRequestID, PDReqReimbID) {
    var result;
    $.ajax({
        type:"POST",
        url:"php/db_getPDReqFSComments.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// copy row DB /////////////////////////////////////////////////////////////////
function db_copyPDRequest(PDRequestID, LoginID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyPDRequest.php",
        data:{PDRequestID:PDRequestID, LoginID:LoginID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyPDJustArea(PDRequestID, NewPDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyPDJustArea.php",
        data:{PDRequestID:PDRequestID, NewPDRequestID:NewPDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyNarrative(PDRequestID, NewPDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyNarrative.php",
        data:{PDRequestID:PDRequestID, NewPDRequestID:NewPDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyNarrativeAttach(SourceFileLinkName, PDRequestID, FileLinkName, FileName) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyNarrativeAttach.php",
        data:{SourceFileLinkName:SourceFileLinkName, PDRequestID:PDRequestID, FileLinkName:FileLinkName, FileName:FileName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyPDReqHours(PDRequestID, NewPDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyPDReqHours.php",
        data:{PDRequestID:PDRequestID, NewPDRequestID:NewPDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyPDReqReimb(PDRequestID, NewPDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyPDReqReimb.php",
        data:{PDRequestID:PDRequestID, NewPDRequestID:NewPDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyFlexWeek(AvailFlexWeekID, LoginID, curDate, FWHours) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyFlexWeek.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, LoginID:LoginID, curDate:curDate, FWHours:FWHours},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_copyFWJustArea(AvailFlexWeekID, FlexWeekID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_copyFWJustArea.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, FlexWeekID:FlexWeekID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertLogin(LoginName, LoginEmail, LoginDepart, LoginPhone, LoginDiv, LoginEType) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertLogin.php",
        data:{LoginName:LoginName, LoginEmail:LoginEmail, LoginDepart:LoginDepart, LoginPhone:LoginPhone, LoginDiv:LoginDiv, LoginEType:LoginEType},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDRequest(LoginID, ResourceTypeID, StatusID, PDReqStepID, FiscalYrs, ActTitle, StartDate, EndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDRequest.php",
        data:{LoginID:LoginID, ResourceTypeID:ResourceTypeID, StatusID:StatusID, PDReqStepID:PDReqStepID, FiscalYrs:FiscalYrs, ActTitle:ActTitle, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqUserInfo(PDRequestID, Name, Email, Depart, Phone, Division, EmployeeType) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqUserInfo.php",
        data:{PDRequestID:PDRequestID, Name:Name, Email:Email, Depart:Depart, Phone:Phone, Division:Division, EmployeeType:EmployeeType},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDJustArea(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDJustArea.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertNarrative(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertNarrative.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPAReqInfo1(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPAReqInfo1.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPAReqInfo2(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPAReqInfo2.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqHours(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqHours.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqReimb(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqReimb.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTransaction(PDRequestID, LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTransaction.php",
        data:{PDRequestID:PDRequestID, LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAvailFlexWeek(AdministratorID, ActTitle, FiscalYrs, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAvailFlexWeek.php",
        data:{AdministratorID:AdministratorID, ActTitle:ActTitle, FiscalYrs:FiscalYrs, ActPresenter:ActPresenter, Location:Location, ActCity:ActCity, ActStateID:ActStateID, ActDescrip:ActDescrip, ActLink:ActLink,
                StartDate:StartDate, StartTime:StartTime, EndDate:EndDate, EndTime:EndTime, FWHours:FWHours},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFlexWeek(LoginID, curDate, ActTitle, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFlexWeek.php",
        data:{LoginID:LoginID, curDate:curDate, ActTitle:ActTitle, ActPresenter:ActPresenter, Location:Location, ActCity:ActCity, ActStateID:ActStateID, ActDescrip:ActDescrip, ActLink:ActLink,
                StartDate:StartDate, StartTime:StartTime, EndDate:EndDate, EndTime:EndTime, FWHours:FWHours},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAvailFWJustArea(AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAvailFWJustArea.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, FWJust1:FWJust1, FWJust2:FWJust2, FWJust3:FWJust3, FWJust4:FWJust4,
                FWJust5:FWJust5, FWJust6:FWJust6, FWJust7:FWJust7, FWJust8:FWJust8, FWJust9:FWJust9},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFWJustArea(FlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFWJustArea.php",
        data:{FlexWeekID:FlexWeekID, FWJust1:FWJust1, FWJust2:FWJust2, FWJust3:FWJust3, FWJust4:FWJust4,
                FWJust5:FWJust5, FWJust6:FWJust6, FWJust7:FWJust7, FWJust8:FWJust8, FWJust9:FWJust9},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFlexWeekUserInfo(FlexWeekID, AvailFlexWeekID, Name, Email, Depart, Phone, Division) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFlexWeekUserInfo.php",
        data:{FlexWeekID:FlexWeekID, AvailFlexWeekID:AvailFlexWeekID, Name:Name, Email:Email, Depart:Depart, Phone:Phone, Division:Division},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAvailPDRequest(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAvailPDRequest.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTracDoc(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTracDoc.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertLogHistory(PDRequestID, LoginName, LogMsg) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertLogHistory.php",
        data:{PDRequestID:PDRequestID, LoginName:LoginName, LogMsg:LogMsg},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqHRProcess(PDRequestID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqHRProcess.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqHRProcessLog(PDRequestID, HrsAdminID, HrsStepID, HrsStatusID, HrsComments, ReimbAdminID, ReimbStepID, ReimbStatusID, ReimbComments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqHRProcessLog.php",
        data:{PDRequestID:PDRequestID, HrsAdminID:HrsAdminID, HrsStepID:HrsStepID, HrsStatusID:HrsStatusID, HrsComments:HrsComments,
                ReimbAdminID:ReimbAdminID, ReimbStepID:ReimbStepID, ReimbStatusID:ReimbStatusID, ReimbComments:ReimbComments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqHRProcessLogHrs(PDRequestID, HrsAdminID, HrsStepID, HrsStatusID, HrsComments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqHRProcessLogHrs.php",
        data:{PDRequestID:PDRequestID, HrsAdminID:HrsAdminID, HrsStepID:HrsStepID, HrsStatusID:HrsStatusID, HrsComments:HrsComments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqHRProcessLogReimb(PDRequestID, ReimbAdminID, ReimbStepID, ReimbStatusID, ReimbComments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqHRProcessLogReimb.php",
        data:{PDRequestID:PDRequestID, ReimbAdminID:ReimbAdminID, ReimbStepID:ReimbStepID, ReimbStatusID:ReimbStatusID, ReimbComments:ReimbComments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqFundSrc(PDRequestID, PDReqReimbID, FundSrcTypeID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqFundSrc.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID, FundSrcTypeID:FundSrcTypeID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDReqFSComments(PDRequestID, PDReqReimbID, Comments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDReqFSComments.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID, Comments:Comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDSystem(PDSystem, ApplyDate, PDAmt) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDSystem.php",
        data:{PDSystem:PDSystem, ApplyDate:ApplyDate, PDAmt:PDAmt},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPDSystemLog(LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPDSystemLog.php",
        data:{LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateLogin(LoginID, LoginName, LoginEmail, LoginDepart, LoginPhone, LoginDiv, LoginEType) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateLogin.php",
        data:{LoginID:LoginID, LoginName:LoginName, LoginEmail:LoginEmail, LoginDepart:LoginDepart, LoginPhone:LoginPhone, LoginDiv:LoginDiv, LoginEType:LoginEType},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequest(PDRequestID, LoginID, ResourceTypeID, FiscalYrs, ActTitle, ActOrganizer, ActCity, ActStateID, ActDescrip, ActLink, StartDate, EndDate, CreateDate, Comments, ckbCom) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequest.php",
        data:{PDRequestID:PDRequestID, LoginID:LoginID, ResourceTypeID:ResourceTypeID, FiscalYrs:FiscalYrs, ActTitle:ActTitle, ActOrganizer:ActOrganizer, 
                ActCity:ActCity, ActStateID:ActStateID, ActDescrip:ActDescrip, ActLink:ActLink, StartDate:StartDate, EndDate:EndDate, CreateDate:CreateDate, Comments:Comments, ckbCom:ckbCom},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestComments(PDRequestID, Comments, ckbCom) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestComments.php",
        data:{PDRequestID:PDRequestID, Comments:Comments, ckbCom:ckbCom},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPreSubDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPreSubDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPostSubDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPostSubDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPreAprDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPreAprDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPrePendingAprDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPrePendingAprDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPostAprDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPostAprDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestPostPendingAprDate(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestPostPendingAprDate.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestStep(PDRequestID, PDReqStepID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestStep.php",
        data:{PDRequestID:PDRequestID, PDReqStepID:PDReqStepID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDRequestStatus(PDRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDRequestStatus.php",
        data:{PDRequestID:PDRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqUserInfo(PDRequestID, Name, Email, Depart, Phone, Division, EmployeeType) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqUserInfo.php",
        data:{PDRequestID:PDRequestID, Name:Name, Email:Email, Depart:Depart, Phone:Phone, Division:Division, EmployeeType:EmployeeType},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDJustArea(PDRequestID, JustArea_1, JustArea_2, JustArea_3, JustArea_4, JustArea_5, JustArea_6, JustArea_7, JustArea_8, JustArea_9) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDJustArea.php",
        data:{PDRequestID:PDRequestID, JustArea_1:JustArea_1, JustArea_2:JustArea_2, JustArea_3:JustArea_3, JustArea_4:JustArea_4,
                JustArea_5:JustArea_5, JustArea_6:JustArea_6, JustArea_7:JustArea_7, JustArea_8:JustArea_8, JustArea_9:JustArea_9},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateNarrative(PDRequestID, Narrative) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateNarrative.php",
        data:{PDRequestID:PDRequestID, Narrative:Narrative},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePAReqInfo1(PDRequestID, PAReqInfo1) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePAReqInfo1.php",
        data:{PDRequestID:PDRequestID, PAReqInfo1:PAReqInfo1},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePAReqInfo2(PDRequestID, PAReqInfo2) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePAReqInfo2.php",
        data:{PDRequestID:PDRequestID, PAReqInfo2:PAReqInfo2},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHoursPreActivity(PDRequestID, PreInputHr, PrePresHr, PrePartHr, PreTotalHr) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHoursPreActivity.php",
        data:{PDRequestID:PDRequestID, PreInputHr:PreInputHr, PrePresHr:PrePresHr, PrePartHr:PrePartHr, PreTotalHr:PreTotalHr},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHoursPreApprovedHrs(PDRequestID, PreAppHr, PreNotAppHr) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHoursPreApprovedHrs.php",
        data:{PDRequestID:PDRequestID, PreAppHr:PreAppHr, PreNotAppHr:PreNotAppHr},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHoursPostActivity(PDRequestID, PostInputHr, PostPresHr, PostPartHr, PostTotalHr) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHoursPostActivity.php",
        data:{PDRequestID:PDRequestID, PostInputHr:PostInputHr, PostPresHr:PostPresHr, PostPartHr:PostPartHr, PostTotalHr:PostTotalHr},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHoursPostApprovedHrs(PDRequestID, PostAppHr, PostNotAppHr) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHoursPostApprovedHrs.php",
        data:{PDRequestID:PDRequestID, PostAppHr:PostAppHr, PostNotAppHr:PostNotAppHr},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqReimbPreActivity(PDRequestID, PreReqFee, PreTravel, PreMileage, PreMilCost, PreLodging, PreNumBrk, PreBrkCost, PreNumLun, PreLunCost, PreNumDin, PreDinCost,
                                            OtherSource, PreOthCost, PreSubTotal, FundingSource, FSApproved, FSComments, PreFunCost, PreTotalCost, PreTotalAmtRequest) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqReimbPreActivity.php",
        data:{PDRequestID:PDRequestID, PreReqFee:PreReqFee, PreTravel:PreTravel, PreMileage:PreMileage, PreMilCost:PreMilCost, PreLodging:PreLodging, PreNumBrk:PreNumBrk, PreBrkCost:PreBrkCost,
                PreNumLun:PreNumLun, PreLunCost:PreLunCost, PreNumDin:PreNumDin, PreDinCost:PreDinCost, OtherSource:OtherSource, PreOthCost:PreOthCost, PreSubTotal:PreSubTotal, FundingSource:FundingSource,
                FSApproved:FSApproved, FSComments:FSComments, PreFunCost:PreFunCost, PreTotalCost:PreTotalCost, PreTotalAmtRequest:PreTotalAmtRequest},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqReimbPreActivityApprovedAmount(PDRequestID, PreTotalAmtApproved, PreTotalAmtNotApproved, PreTotalAmtPendingFunds) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqReimbPreActivityApprovedAmount.php",
        data:{PDRequestID:PDRequestID, PreTotalAmtApproved:PreTotalAmtApproved, PreTotalAmtNotApproved:PreTotalAmtNotApproved, PreTotalAmtPendingFunds:PreTotalAmtPendingFunds},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqReimbPostActivity(PDRequestID, PostReqFee, PostTravel, PostMileage, PostMilCost, PostLodging, PostNumBrk, PostBrkCost, PostNumLun, PostLunCost, PostNumDin, PostDinCost,
                                            OtherSource, PostOthCost, PostSubTotal, FundingSource, FSApproved, FSComments, PostFunCost, PostTotalCost, PostTotalAmtRequest) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqReimbPostActivity.php",
        data:{PDRequestID:PDRequestID, PostReqFee:PostReqFee, PostTravel:PostTravel, PostMileage:PostMileage, PostMilCost:PostMilCost, PostLodging:PostLodging, PostNumBrk:PostNumBrk, PostBrkCost:PostBrkCost,
                PostNumLun:PostNumLun, PostLunCost:PostLunCost, PostNumDin:PostNumDin, PostDinCost:PostDinCost, OtherSource:OtherSource, PostOthCost:PostOthCost, PostSubTotal:PostSubTotal, FundingSource:FundingSource,
                FSApproved:FSApproved, FSComments:FSComments, PostFunCost:PostFunCost, PostTotalCost:PostTotalCost, PostTotalAmtRequest:PostTotalAmtRequest},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqReimbPostActivityApprovedAmount(PDRequestID, PostTotalAmtApproved, PostTotalAmtNotApproved, PostTotalAmtPendingFunds) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqReimbPostActivityApprovedAmount.php",
        data:{PDRequestID:PDRequestID, PostTotalAmtApproved:PostTotalAmtApproved, PostTotalAmtNotApproved:PostTotalAmtNotApproved, PostTotalAmtPendingFunds:PostTotalAmtPendingFunds},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAvailFlexWeek(AvailFlexWeekID, AdministratorID, ActTitle, FiscalYrs, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAvailFlexWeek.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, AdministratorID:AdministratorID, ActTitle:ActTitle, FiscalYrs:FiscalYrs, ActPresenter:ActPresenter, Location:Location, 
                ActCity:ActCity, ActStateID:ActStateID, ActDescrip:ActDescrip, ActLink:ActLink, StartDate:StartDate, StartTime:StartTime, EndDate:EndDate, EndTime:EndTime, FWHours:FWHours},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAvailFWJustArea(AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAvailFWJustArea.php",
        data:{AvailFlexWeekID:AvailFlexWeekID, FWJust1:FWJust1, FWJust2:FWJust2, FWJust3:FWJust3, FWJust4:FWJust4, FWJust5:FWJust5, FWJust6:FWJust6, FWJust7:FWJust7, FWJust8:FWJust8, FWJust9:FWJust9},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateTracDoc(TracDocID, ReqNum, DistPaid, Comments) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateTracDoc.php",
        data:{TracDocID:TracDocID, ReqNum:ReqNum, DistPaid:DistPaid, Comments:Comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDSystem(PDSystem, ApplyDateList, ApplyDate, PDAmt) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDSystem.php",
        data:{PDSystem:PDSystem, ApplyDateList:ApplyDateList, ApplyDate:ApplyDate, PDAmt:PDAmt},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFlexWeek(FlexWeekID, FWHours) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFlexWeek.php",
        data:{FlexWeekID:FlexWeekID, FWHours:FWHours},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFlexWeekConfirmed(FlexWeekID, FWHours, Confirmed) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFlexWeekConfirmed.php",
        data:{FlexWeekID:FlexWeekID, FWHours:FWHours, Confirmed:Confirmed},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHRProcess(PDRequestID, HrsAdminID, HrsStepID, HrsStatusID, ReimbAdminID, ReimbStepID, ReimbStatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHRProcess.php",
        data:{PDRequestID:PDRequestID, HrsAdminID:HrsAdminID, HrsStepID:HrsStepID, HrsStatusID:HrsStatusID, ReimbAdminID:ReimbAdminID, ReimbStepID:ReimbStepID, ReimbStatusID:ReimbStatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHRProcessHrs(PDRequestID, HrsAdminID, HrsStepID, HrsStatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHRProcessHrs.php",
        data:{PDRequestID:PDRequestID, HrsAdminID:HrsAdminID, HrsStepID:HrsStepID, HrsStatusID:HrsStatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHRProcessHrsStatusDate(PDRequestID, HrsPreSubDate, HrsPreAprDate, HrsPrePendingAprDate, HrsPostSubDate, HrsPostAprDate, HrsPostPendingAprDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHRProcessHrsStatusDate.php",
        data:{PDRequestID:PDRequestID, HrsPreSubDate:HrsPreSubDate, HrsPreAprDate:HrsPreAprDate, HrsPrePendingAprDate:HrsPrePendingAprDate, 
                HrsPostSubDate:HrsPostSubDate, HrsPostAprDate:HrsPostAprDate, HrsPostPendingAprDate:HrsPostPendingAprDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHRProcessReimb(PDRequestID, ReimbAdminID, ReimbStepID, ReimbStatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHRProcessReimb.php",
        data:{PDRequestID:PDRequestID, ReimbAdminID:ReimbAdminID, ReimbStepID:ReimbStepID, ReimbStatusID:ReimbStatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqHRProcessReimbStatusDate(PDRequestID, ReimbPreSubDate, ReimbPreAprDate, ReimbPrePendingAprDate, ReimbPostSubDate, ReimbPostAprDate, ReimbPostPendingAprDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqHRProcessReimbStatusDate.php",
        data:{PDRequestID:PDRequestID, ReimbPreSubDate:ReimbPreSubDate, ReimbPreAprDate:ReimbPreAprDate, ReimbPrePendingAprDate:ReimbPrePendingAprDate, 
                ReimbPostSubDate:ReimbPostSubDate, ReimbPostAprDate:ReimbPostAprDate, ReimbPostPendingAprDate:ReimbPostPendingAprDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundSrcType(FundSrcTypeID, Active, FundSrcType, FundSrcAdmin, FundSrcEmail, FundSrcDescrip) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundSrcType.php",
        data:{FundSrcTypeID:FundSrcTypeID, Active:Active, FundSrcType:FundSrcType, FundSrcAdmin:FundSrcAdmin, FundSrcEmail:FundSrcEmail, FundSrcDescrip:FundSrcDescrip},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqFundSrcFSSelected(PDRequestID, PDReqReimbID, FundSrcTypeID, FSSelected) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqFundSrcFSSelected.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID, FundSrcTypeID:FundSrcTypeID, FSSelected:FSSelected},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePDReqFSComments(PDRequestID, PDReqReimbID, Comments) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePDReqFSComments.php",
        data:{PDRequestID:PDRequestID, PDReqReimbID:PDReqReimbID, Comments:Comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deletePDRequest(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deletePDRequest.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteFlexWeek(FlexWeekID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteFlexWeek.php",
        data:{FlexWeekID:FlexWeekID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteAvailFlexWeek(AvailFlexWeekID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteAvailFlexWeek.php",
        data:{AvailFlexWeekID:AvailFlexWeekID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteTracDoc(PDRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteTracDoc.php",
        data:{PDRequestID:PDRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// upload attach file //////////////////////////////////////////////////////////
function uploadAttachFileJustNarrative(file_data) {
    var ResultID = "";
    $.ajax({  
        url: "php/upload_file_just_narrative.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            ResultID = data;
        }  
    });
    return ResultID;
}

function uploadAttachFilePostInfo1(file_data) {
    var ResultID = "";
    $.ajax({  
        url: "php/upload_file_post_info_1.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            ResultID = data;
        }  
    });
    return ResultID;
}

function uploadAttachFilePostInfo2(file_data) {
    var ResultID = "";
    $.ajax({  
        url: "php/upload_file_post_info_2.php",  
        type: "POST",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            ResultID = data;
        }  
    });
    return ResultID;
}

// delete attach file //////////////////////////////////////////////////////////
function deleteAttachFileJustNarrative(FileLinkName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/delete_file_just_narrative.php",
        data:{FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = data;
        }
    });
    return Result;
}

function deleteAttachFilePAReqInfo1(FileLinkName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/delete_file_pa_Req_Info_1.php",
        data:{FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = data;
        }
    });
    return Result;
}

function deleteAttachFilePAReqInfo2(FileLinkName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/delete_file_pa_Req_Info_2.php",
        data:{FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = data;
        }
    });
    return Result;
}