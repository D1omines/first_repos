import { SaveTransaction, SaveCategoryes} from "./transfer.js";

let transaction = [] //{id, type, amount, category, komment, date}
let categoryes = [] //{category, amount}
let lastTransaction = {}
let id = localStorage.getItem('id') || 1

export function createOperation (type, amount, category, komment){
    const data = new Date()
    const today = formatDate(data) 

    const nameOperation = category.charAt(0).toUpperCase() + category.slice(1)
  
    
    lastTransaction = {
        id,
        type,
        amount,
        category : nameOperation,
        komment,
        date: today,
    }
    
    transaction = [...transaction, lastTransaction]

    id++     
    
    SaveTransaction(id, transaction)

    
    
    if(type == 'expense'){
        createCategory(amount, category.toLowerCase())        
    }
}

function createCategory(opAmount, namecategory){  
    
    const test = categoryes.filter(el => el.category === namecategory)
    
        
    if(test.length > 0){
        const test2 = categoryes.find(el => el.category === test[0].category) 
        test2.amount += Number(opAmount)     
    }else{
        categoryes = [...categoryes, {
            category : namecategory,
            amount : +opAmount,
        }]
    }    
    
    SaveCategoryes(categoryes)    
}

export function deleteOperation(id){
    transaction = transaction.filter(el => el.id != id)    
    
}

function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`
}


/// GET Metods

export function getAllTransaction(){
    return transaction || {}
}

export function getLastTransaction(){
    return lastTransaction

}

export function getCategorys(){
    return categoryes
}


///SET Metods

export function setCategoryes(ct){
    categoryes = ct
}

export function setAllTransaction(tr){
    transaction = tr
}



export function clearTransaction(){
    transaction = [] 
}


