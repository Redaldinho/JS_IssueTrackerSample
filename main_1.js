
// Event handler of the form
var form = document.getElementById("issueInputForm");
form.addEventListener("submit", function(event){
  var issueId = chance.guid(); // Using the Chance's Librairy to generate an unique ID
  var issueDesc = document.getElementById("issueDescInput").value; // Getting the value written in Description's Field
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueStatus = "open";

// Checking if issueDesc, issueAssignedTo aren't empty
  if(!issueDesc) {
    alert("You Should decribe your Issue !");
  } else if(!issueAssignedTo) {
    alert("You Should Assign the Issue to a Responsible !");
  } else {


// Putting these elements inside an Object
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }
// Storing the elements in localStorage
  if(localStorage.getItem('issues') == null){
    issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues))
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  document.getElementById("issueInputForm").reset();

// Calling the fetchIssues function to refresh the list of issues
  fetchIssues();
  event.preventDefault();
}
});
// Setting the status of an Issue to Closed , Close Button
function setStatusClosed(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  issues.forEach(function(issue){
    if(issue.id == id){
      issue.status = "Closed";
    }
  });
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();

}
// Deleting an Issue, Delete Button
function deleteIssue(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues.splice(i, 1);
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function fetchIssues(){

  var issues = JSON.parse(localStorage.getItem("issues"));
  var issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";
  issues.forEach(function(issue){
    var id = issue.id;
    var desc = issue.description;
    var severity = issue.severity;
    var assignedTo = issue.assignedTo;
    var status = issue.status;

// Generating elements with DOM Methods
    var well = document.createElement("div"); // Creating Div Element
    well.className = "well"; // Setting the class of the Div element
    issuesList.appendChild(well);

// Populating the Div With Data
    var h6 = document.createElement("h6");
    h6.innerHTML = "Issue ID: " + id;
    well.appendChild(h6);
    var p = document.createElement("p");
    var span = document.createElement("span");
    span.className = "label label-info";
    span.innerHTML = status;
    p.appendChild(span);
    well.appendChild(p);
    var h3 = document.createElement("h3");
    h3.innerHTML = " " + desc;
    well.appendChild(h3);
    var p1 = document.createElement("p");
    var span1 = document.createElement("span");
    span1.className = "glyphicon glyphicon-time";
    p1.innerHTML = " " + severity;
    p1.prepend(span1);
    well.appendChild(p1);
    var p2 = document.createElement("p");
    var span2 = document.createElement("span");
    span2.className = "glyphicon glyphicon-user";
    p2.innerHTML = " " + assignedTo;
    p2.prepend(span2);
    well.appendChild(p2);

// Creating the Buttons
    var a = document.createElement("a");
    a.className = "btn btn-warning";
    a.setAttribute("onclick", "setStatusClosed(\'" +id+ "\')");
    a.innerHTML = "Close";
    well.appendChild(a);
    var a1 = document.createElement("a");
    a1.className = "btn btn-danger";
    a1.setAttribute("onclick", "deleteIssue(\'" +id+ "\')");
    a1.innerHTML = " " + "Delete";
    well.appendChild(a1);





});

}
// Creating nodes without setting classes... I did not use this fuction so far ...
function elt(type, classType) {
  var node = document.createElement(type);
  node.className = classType;
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if(typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
    }

    return node ;

  }
