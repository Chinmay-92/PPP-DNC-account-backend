
export interface CreditNote {
    packageNumber: 1,
    openingBalanceAmount: 1000,
    runningACBill: 100,
    creditNoteUtilizationAmount: 123,
    utilizationType: 1, //Self or transfer
    contractor: 'testContractor',
    challanNumber: [1,2],
    challanAmout: 800,
    challanDepartment: '',
    typeOfChallan: 1, //partial or full
    juniorEnggName: 'testJE',
    juniorEnggEmpCode: 1,
    deputyEnggName: 'testDE',
    deputyEnggEmpCode: 2,
    executiveEnggName: 'testEE',
    executiveEnggEmpCode: 3,
    superintendentEnggName: 'testSE',
    superintendentEnggEmpCode: 4,
    chiefEnggName: 'testCE',
    chiefEnggEmpCode: 5,
    auditClerkName: '',
    adminOfficerName: '',
    chiefAccountantName: '',
    creditNoteCurrentBalance: 100,
    raBillDocument: '',
    creditNoteAdjustmentBillDocument: '',
    dateTime: '',
    remarks: ''
}