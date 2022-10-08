// object to hold skills
const data = {
    skills: ["Cascading Style Sheets (CSS)", "Hypertext Markup Language (HTML)"]
}

// object to hold main DOM nodes
const $nodes = {
    div: $("div.skills"),
    form: $("form"),
    textInput: $("input[type='text']")
}

// save the todos in local storage
function saveSkills(){
    // turn the data object into a JSON string
    const json = JSON.stringify(data)
    // save the string in local storage
    localStorage.setItem("skillsdata", json)
}

// function for loading todo from local storage
function loadSkills(){
    // get data from local storage
    const json = localStorage.getItem("skillsdata")
    // update data, if json isn't undefined
    if(json){
        // parse json string into JS object
        const savedData = JSON.parse(json)
        // update data with the saved array
        data.skills = savedData.skills
    }
}

function renderSkills() { // put the to-dos on the screen
    $nodes.div.empty()
    for(let skill of data.skills){
        const $skillDiv = $("<div>").addClass("skill")
        $skillDiv.text(skill)
        $nodes.div.append($skillDiv)
        $skillDiv.on("click", function(event){
            const text = $(event.target).text()
            const index = data.skills.indexOf(text)
            data.skills.splice([index], 1)
            renderSkills()
        })
    }
    saveSkills()
}

function addSkill(newSkill) { // add skills 
    data.skills.push(newSkill) // add new skill to array
    renderSkills()
}

// make the form work
$nodes.form.on("submit", function(event){
    event.preventDefault()
    addSkill($nodes.textInput.val()) // add the to-do
    $nodes.textInput.val("") // empties the form
})

renderSkills()