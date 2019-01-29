//url dependant
var s = window.location.href
var exam_name = s.split('&').pop().split('=').pop()
console.log(exam_name)

var socket = io('http://10.208.34.106:4000');
var message = document.getElementById('message')
var handle  = document.getElementById('handle')
var output  = document.getElementById('output')
var button  = document.getElementById('send')
var feedback = document.getElementById('feedback')
var pageName = document.getElementById('page_name')
var firstTime = true


//socket.on('ready',function(){
//console.log('server ready')
  


function emailChk(x){  //regex for checking if name is followed by email or the other way round
  //return /(.+@[A-Za-z]+.(com|in)\s[A-Za-z]+\s[A-Za-z]+)|([A-Za-z]+\s[A-Za-z]+[\s,|-].+@[A-Za-z]+.(com|in))/i.test(x)
  var retvalue = null;
 
  if(/(.+@[A-Za-z]+.(com|in)[\s,|-]+[A-Za-z]+\s[A-Za-z]+)/i.test(x)){
     retvalue = 1 //for email before name
   }else if(/([A-Za-z]+\s[A-Za-z]+[\s,|-].+@[A-Za-z]+.(com|in))/i.test(x)){
     retvalue = 2  //for email after name
  }
  return retvalue
}

var removeSpaceElem = (arr)=>{   //helper function for the extract information function 
  for(var i=0; i< arr.length; i++){
    if(arr[i] == " "|arr[i]==""){
      arr.splice(i,1)
    }
  }
  return arr
} 


function extractInformation(nameEmailString,retvalue){
    var info_arr = nameEmailString.split(/[\s,|-]/)
    info_arr = removeSpaceElem(info_arr)
    
    var infoObj = new Object();
    if(retvalue==1){
      infoObj.fname = info_arr[1]
      infoObj.lname = info_arr[2]
      infoObj.email = info_arr[0]
    }else if(retvalue==2){
      infoObj.fname = info_arr[0]
      infoObj.lname = info_arr[1]
      infoObj.email = info_arr[2]
    }
    return infoObj
}


message.addEventListener("keyup",function(event){
  event.preventDefault();
  if(event.keyCode == 13){
    button.click()
  }
})

message.addEventListener('focus',function(){
  var retvalue = emailChk(handle.value)
  if(!(retvalue == 1||retvalue == 2)){
    alert(handle.value + " is an invalid email ID or name format")
 }if(retvalue!=null){
  button.disabled=false
 }
 
})



button.addEventListener('click',function(){

 var userInfo=userInfo = extractInformation(handle.value, emailChk(handle.value))
  
  socket.emit('chat',{
      examName:exam_name,
      message:message.value,
      handle:userInfo.fname,
      fullName: userInfo.fname+" "+userInfo.lname,
      email:userInfo.email

  })
  
  console.log(userInfo)
  message.value = ""
  firstTime = false
  handle.disabled = true //avoid calling this statement again and again
  
})

//--------------------------------------socket events communication----------------------------------------------------



socket.on('chat',function(data){
  feedback.innerHTML = ""
  output.innerHTML += '<p><strong>'+data.handle+' : </strong>'+data.message+' <p>'
  document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight 
})

socket.on('typing',function(data){
  feedback.innerHTML = '<p>'+data +' is thinking ....</p>'
})


