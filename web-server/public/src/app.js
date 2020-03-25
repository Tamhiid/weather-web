

console.log('Client side JavaScript is loaded!')




const weatherForm = document.querySelector('form')
const formInput = document.querySelector('input')
const p = document.querySelector('#p')
const p1 = document.querySelector('#p1')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

   const location = formInput.value
  p.textContent = 'Loading...'
  p1.textContent = ""
   
   fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((Data)=>{
        
        if(Data.error){
            p.textContent = Data.error
            p1.textContent = ""
        }
        else{
            
            p.textContent = Data.forecat
            p1.textContent = Data.location
           
            
        }
    })
})
})