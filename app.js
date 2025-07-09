import { createOperation,      
    renderTransaction, 
    renderCategorys,
    renderBalance,
    clearRenderTransaction,
    getAllTransaction, 
    getCategorys,
    setAllTransaction,  
    setCategoryes,  
    getLastTransaction,    
    loadTransaction,
    loadCategoryes,    
    DeleteTransactionFromLocal,
    DeleteOperationFromLocal,
    SaveTransaction,
    SaveCategoryes,} from "./src/transfer.js"


document.querySelector('.form__btn').addEventListener('click', addOperation)
const form = document.querySelector('form')



form.addEventListener('submit', formEvent)
document.addEventListener('DOMContentLoaded', Init)



const typeSelect = document.querySelector('#type')
const amount = document.querySelector('#amount')
const category = document.querySelector('#category')
const komment = document.querySelector('#komment')

function Init(){
    loadTransactionFromLocal() 
    loadCategoryesFromLocal()
    checkTransactionTitleRender()

}


function formEvent(event){
    event.preventDefault()
    event.target.reset()
}


function addOperation(){     
    createOperation(typeSelect.value, Number(amount.value), category.value, komment.value)   
            
    sendRenderOperation()
    renderCategorys(getCategorys())  
    checkTransactionTitleRender()  
    
    
    
}

function onOpenTransaction(id){   

    const transaction = getAllTransaction()
    const currentTrans = transaction.find(el => el.id == id)

    if(currentTrans){
        ShowDataTransaction(currentTrans)       
    }
    
}

function ShowDataTransaction(obj){
    //console.log(obj);
    
    const modalClass = document.querySelector('.modal__card')
    const modalId = document.querySelector('.modal__card-container-titleId')
    const modalCat = document.querySelector('.modal__card-container-data-category-input')
    const modalOper = document.querySelector('.modal__card-container-data-operation-input')
    const modaDate = document.querySelector('.modal__card-container-data-date-input')
    const modalKomment = document.querySelector('.modal__card-container-data-komment-input')

    modalClass.classList.remove('modal__card-hiden')

    modalId.innerText = obj.id
    modalCat.value = obj.category
    modalOper.value = obj.amount
    modaDate.value = obj.date
    modalKomment.value = obj.komment

    const btnSave = document.querySelector('.modal-save')
    const btnClose = document.querySelector('.modal-close')

    btnSave.addEventListener('click', modalSave)

    btnClose.addEventListener('click', modalClose)
}

function modalClose(){
    const modalClass = document.querySelector('.modal__card')
    modalClass.classList.add('modal__card-hiden')   
    
       
}

function modalSave(){    
    const idModal = document.querySelector(`.modal__card-container-titleId`).innerText   
    const amountModal = document.querySelector(`.modal__card-container-data-operation-input`).value    
    const kommentModal = document.querySelector(`.modal__card-container-data-komment-input`).value

    const li = document.querySelector(`li[data-id="${idModal}"`)    
    const liPrice = li.querySelector('.transactions__text-price')   
    
    liPrice.innerText = amountModal 

    
    const transaction = getAllTransaction()
    const cat = getCategorys()

    transaction.forEach(el => {
        if(Number(el.id) === Number(idModal)){            
            el.amount = amountModal            
            el.komment = kommentModal 

            if(el.type === 'expense'){                
                recalculateExpence(li)               
            }
        }       
    })

    setAllTransaction(transaction)
    setCategoryes(cat)
    
    clearRenderTransaction()
    renderCategorys(cat)
    renderTransaction(transaction, onOpenTransaction, onDeleteTransaction)
    renderBalance(transaction)

    SaveTransaction(Number(localStorage.getItem('id')), transaction)
    SaveCategoryes(cat)

    const modalClass = document.querySelector('.modal__card')
    modalClass.classList.add('modal__card-hiden')    
}

function recalculateExpence(li){

    const allCat = document.querySelectorAll('.expense')
    const currentCat = li.querySelector('.transactions__text-category').innerText

    const cat = getCategorys()
    let arrSumCat= []

    allCat.forEach(el => {
       if(el.querySelector('.transactions__text-category').innerText === currentCat){
            arrSumCat = [...arrSumCat, Number(el.querySelector('.transactions__text-price').innerText)]
       }
    })    

    cat.forEach(el => {
        if (el.category === currentCat.toLowerCase()) {
            el.amount = arrSumCat.reduce((sum, elCat) => {
                return sum += elCat
            }, 0)
        }
    })     
        
}


function onDeleteTransaction(id){
    const li = document.querySelector(`li[data-id="${id}"`)
    

    let transaction = getAllTransaction()
    const findCategory = transaction.find(el => el.id == id)
    let newCategory = getCategorys()

    newCategory.forEach(el => {
        if(el.category.toLowerCase() === findCategory.category.toLowerCase()){
            el.amount -= Number(findCategory.amount)  
            if(el.amount == 0){
                newCategory = newCategory.filter(cat => cat.amount != 0)
            }       
        }
    })

    transaction = transaction.filter(el => el.id != id)   
    

    setAllTransaction(transaction)
    setCategoryes(newCategory)

    renderCategorys(newCategory)
    renderBalance(transaction)

    li.remove()

    DeleteTransactionFromLocal(transaction)   
    DeleteOperationFromLocal(newCategory)
    
}

function sendRenderOperation(){  
    const op = getAllTransaction()  
    
    clearRenderTransaction()
    renderTransaction(op, onOpenTransaction, onDeleteTransaction)      
    
    renderBalance(op)
    checkTransactionTitleRender()
    
}

function loadTransactionFromLocal(){
    const transaction = loadTransaction()
    setAllTransaction(transaction)

    
    renderTransaction(transaction, onOpenTransaction, onDeleteTransaction)
    

    renderBalance(transaction)
}

function loadCategoryesFromLocal(){
    const categoryes = loadCategoryes()
    setCategoryes(categoryes)
    renderCategorys(categoryes)
}

function checkTransactionTitleRender(){
    const p = document.querySelector('.operation-title-null')
    const pCat = document.querySelector('.categoryes-title-null')

    const transaction = getAllTransaction()   
    const category = getCategorys()

    if(transaction.length != 0) p.style.display = 'none'
    else p.style.display = 'block'

    if(category.length != 0) pCat.style.display = 'none'
    else pCat.style.display = 'block'




    
}

