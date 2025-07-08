
const balance = document.querySelector('#balance')

export function renderTransaction(objOp, onOpenTransaction, onDeleteTransaction){       
    
    const ul = document.querySelector('#transaction-list')

    objOp.forEach(el => {
        const li = document.createElement('li')
        const p = document.createElement('p')
        const span2 = document.createElement('span')
        const btn = document.createElement('button')

        li.classList.add(el.type, 'transaction-item') 
        li.dataset.id = el.id
        li.addEventListener('click', () => onOpenTransaction(el.id))

        p.className = 'transactions__text'

        if(el.type === 'income') p.innerHTML = `+<span class="transactions__text-price">${el.amount}</span>₽ <span class="transactions__text-category">${el.category}</span>`
        else p.innerHTML = `- <span class="transactions__text-price">${el.amount}</span>₽ <span class="transactions__text-category">${el.category}</span>`
        
        span2.className = 'transactions__text-date'
        span2.innerHTML = el.date
        btn.className = 'delete'
        btn.innerText = '🗑'
        btn.addEventListener('click', () => onDeleteTransaction(el.id))
    


        ul.prepend(li)
        li.append(p)
        li.append(span2)
        li.append(btn)
    })

    
}

export function clearRenderTransaction(){
    const li = document.querySelectorAll('.transaction-item')
    li.forEach(el => el.remove())
}

export function renderCategorys(objCat){ 

    const catSort = objCat.sort((a, b) => b.amount - a.amount)

    const ul = document.querySelector('.stats')  
    
    const removeLi = document.querySelectorAll('.stats__items')
    removeLi.forEach(el => el.remove())       

    catSort.forEach(el => {
                
        const nameCategory = el.category.charAt(0).toUpperCase() + el.category.slice(1)
        const li = document.createElement('li')
        const p = document.createElement('p')
        const p2 = document.createElement('p')    

        li.className = "stats__items"
        p.className = "stats__items-category"
        p.innerText = nameCategory

        p2.className = "stats__items-price"
        p2.innerText = `${el.amount}₽`

        ul.append(li)
        li.append(p)
        li.append(p2)
        
        
    });
}

export function renderBalance(transaction){
    
    balance.innerText = transaction.reduce((sum, el) => {
        if (el.type == "income")
            return sum += Number(el.amount)
        else{
            return sum -= Number(el.amount)
        }
  }, 0) + '₽'
}