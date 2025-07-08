
export function SaveTransaction(id, transaction){
    localStorage.setItem('id', JSON.stringify(id))
    localStorage.setItem('transaction', JSON.stringify(transaction))    
}

export function SaveCategoryes(objCategoryes){
    localStorage.setItem('categoryes', JSON.stringify(objCategoryes))       
}

export function loadTransaction(){

    const transactionLoad = JSON.parse(localStorage.getItem('transaction')) || []
    return transactionLoad

}

export function loadCategoryes(){

    const categoryesLoad = JSON.parse(localStorage.getItem('categoryes')) || []
    return categoryesLoad

}

export function DeleteTransactionFromLocal(objTrans){
    localStorage.setItem('transaction', JSON.stringify(objTrans))
}

export function DeleteOperationFromLocal(objOperation){
    localStorage.setItem('categoryes', JSON.stringify(objOperation))
}