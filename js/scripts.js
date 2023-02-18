var quizes = [];
var quizesOutof = [];
var assignments = [];
var assignmentsOutof = [];
var labAssignments = [];
var labAssignmentsOutof = [];
var midterm = 0;
var midtermOutof = 0;
var labMidterm = 0;
var labMidtermOutof = 0;
var final = 0;
var finalOutof = 0;
var isLabCourse = false;
var isLabAss = false;
var isMidterm = false;
var isLabMidterm = false;
var isFinal = false;

$(function () {
  $("#labAss").hide();
  $("#labAssContainer").hide();
  $("#midtermContainer").hide();
  $("#labMidterm").hide();
  $("#labMidtermContainer").hide();
  $("#finalContainer").hide();

  $("#courseSubmit").on("click", function () {
    var noOfCourses = $("#noOfCourses").val();
    var courseDiv = $("#courses");
    courseDiv.empty();
    if (noOfCourses <= 0) {
      return;
    }
    for (var i = 0; i < noOfCourses; i++) {
      var j = i + 1;
      courseDiv.append(getSgpaHtml(j));
    }
  });

  $("#quizSubmit").on("click", function () {
    var quizesNo = $("#noOfQuizes").val();
    var quizDiv = $("#quizes");
    quizDiv.empty();
    if (quizesNo <= 0) {
      return;
    }
    for (var i = 0; i < quizesNo; i++) {
      var j = i + 1;
      quizDiv.append(getHtml("quiz", "Quiz", j));
    }
  });

  $("#assSubmit").on("click", function () {
    var assignmentsNo = $("#noOfAssignments").val();
    var assignmentDiv = $("#assignemnts");
    assignmentDiv.empty();
    if (assignmentsNo <= 0) {
      return;
    }
    for (var i = 0; i < assignmentsNo; i++) {
      var j = i + 1;
      assignmentDiv.append(getHtml("assignment", "Assignment", j));
    }
  });

  $("#labAssSubmit").on("click", function () {
    var labAssignmentsNo = $("#noOfLabAssignments").val();
    var labAssDiv = $("#labAssignments");
    labAssDiv.empty();
    if (labAssignmentsNo <= 0) {
      return;
    }
    for (var i = 0; i < labAssignmentsNo; i++) {
      var j = i + 1;
      labAssDiv.append(getHtml("labAss", "Lab Assignment", j));
    }
  });

  $("#submit").on("click", function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);

    var quiz = [];
    var quizOutOf = [];
    var assignment = [];
    var assignmentOutOf = [];
    var labAssignment = [];
    var labAssignmentOutof = [];
    var quizNo = $("#noOfQuizes").val();
    var assignmentNo = $("#noOfAssignments").val();
    var labAssignmentNo = $("#noOfLabAssignments").val();

    if (quizNo > 0) {
      for (var i = 0; i < quizNo; i++) {
        var j = i + 1;
        quiz.push(parseFloat($("#quiz" + j).val()));
        quizOutOf.push(parseFloat($("#quiz" + j + "Outof").val()));
      }
    }

    if (assignmentNo > 0) {
      for (var i = 0; i < assignmentNo; i++) {
        var j = i + 1;
        assignment.push(parseFloat($("#assignment" + j).val()));
        assignmentOutOf.push(parseFloat($("#assignment" + j + "Outof").val()));
      }
    }

    if (labAssignmentNo > 0) {
      for (var i = 0; i < labAssignmentNo; i++) {
        var j = i + 1;
        labAssignment.push(parseFloat($("#labAss" + j).val()));
        labAssignmentOutof.push(parseFloat($("#labAss" + j + "Outof").val()));
      }
    }

    quizes = quiz;
    quizesOutof = quizOutOf;

    assignments = assignment;
    assignmentsOutof = assignmentOutOf;

    labAssignments = labAssignment;
    labAssignmentsOutof = labAssignmentOutof;

    midterm = parseFloat($("#midterm").val());
    labMidterm = parseFloat($("#labMidtermMarks").val());

    final = parseFloat($("#final").val());
    midtermOutof = parseFloat($("#midtermOutOf").val());

    labMidtermOutof = parseFloat($("#labMidtermOutOf").val());
    finalOutof = parseFloat($("#finalOutof").val());

    var theoryTotal = 0;
    var labTotal = 0;
    var total = 0;

    theoryTotal += parseFloat(getTotal(quizes, quizesOutof, 15));
    theoryTotal += parseFloat(getTotal(assignments, assignmentsOutof, 10));
    labTotal +=
      isLabCourse && isLabAss
        ? parseFloat(getTotal(labAssignments, labAssignmentsOutof, 25))
        : 0;

    theoryTotal += isMidterm ? parseFloat(getMidterm()) : 0;

    labTotal += isLabCourse && isLabMidterm ? parseFloat(getLabMidterm()) : 0;

    if (isLabCourse) {
      total = isFinal
        ? parseFloat(getFinal())
        : 0 + 0.75 * theoryTotal + 0.25 * labTotal;
    } else {
      console.log("theory total: " + theoryTotal);
      console.log("final: " + parseFloat(getFinal()));
      total = theoryTotal + (isFinal ? parseFloat(getFinal()) : 0);
    }
    $("#total").html("You got: " + total);
  });

  $("#calcSgpa").on("click", function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    var gpa = 0;
    var creditHour = 0;
    var courseNo = $("#noOfCourses").val();
    if (courseNo > 0) {
      for (var i = 0; i < courseNo; i++) {
        var j = i + 1;
        gpa +=
          parseFloat($("#gpa" + j).val()) *
          parseFloat($("#creditHours" + j).val());
        creditHour = creditHour + parseFloat($("#creditHours" + j).val());
      }
    }
    var sgpa = gpa / creditHour;
    $("#total").html(
      "Your Semester GPA: " + Math.round((sgpa + Number.EPSILON) * 100) / 100
    );
  });

  $("#calcCgpa").on("click", function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    var prevCrHrs = parseFloat($("#prevCrHrs").val());
    var prevCgpa = parseFloat($("#prevCgpa").val());
    var currCrHrs = parseFloat($("#currCrHrs").val());
    var currGpa = parseFloat($("#currGpa").val());
    var cgpa =
      (prevCgpa * prevCrHrs + currCrHrs * currGpa) / (currCrHrs + prevCrHrs);
    $("#total").html(
      "Your CGPA: " + Math.round((cgpa + Number.EPSILON) * 100) / 100
    );
  });

  $("#labSubSwitch").on("click", function () {
    if ($("#labSubSwitch").is(":checked")) {
      isLabCourse = true;
      $("#labAss").show();
      $("#labMidterm").show();
    } else {
      isLabCourse = false;
      $("#labAss").hide();
      $("#labMidterm").hide();
    }
  });

  $("#labAssSwitch").on("click", function () {
    if ($("#labAssSwitch").is(":checked")) {
      isLabAss = true;
      $("#labAssContainer").show();
    } else {
      isLabAss = false;
      $("#labAssContainer").hide();
    }
  });

  $("#midtermSwitch").on("click", function () {
    if ($("#midtermSwitch").is(":checked")) {
      isMidterm = true;
      $("#midtermContainer").show();
    } else {
      isMidterm = false;
      $("#midtermContainer").hide();
    }
  });

  $("#labMidtermSwitch").on("click", function () {
    if ($("#labMidtermSwitch").is(":checked")) {
      isLabMidterm = true;
      $("#labMidtermContainer").show();
    } else {
      isLabMidterm = false;
      $("#labMidtermContainer").hide();
    }
  });

  $("#finalSwitch").on("click", function () {
    if ($("#finalSwitch").is(":checked")) {
      isFinal = true;
      $("#finalContainer").show();
    } else {
      isFinal = false;
      $("#finalContainer").hide();
    }
  });
});

function getHtml(type, typeSpaced, index) {
  return (
    '<div class="row fields"><div class="col-5"><input placeholder="' +
    typeSpaced +
    " " +
    index +
    '" class="form-control form-control-sm" type="number" id="' +
    type +
    index +
    '"></div> <div class="col-3 text-center">out of</div><div class="col-4"><input class="form-control form-control-sm" type="number" value="10" id="' +
    type +
    index +
    'Outof"></div></div>'
  );
}

function getSgpaHtml(index) {
  return (
    '<div class="courses"><h4>Course ' +
    index +
    '</h4><div class="crhrs"><label for="creditHours' +
    index +
    '">Credit Hours: </label><select class="form-select" id="creditHours' +
    index +
    '" name="creditHours' +
    index +
    '"><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select><label for="gpa">GPA: </label><select  class="form-select" id="gpa' +
    index +
    '" name="gpa' +
    index +
    '"><option value="4">4</option><option value="3.7">3.7</option><option value="3.3">3.3</option><option value="3">3</option><option value="2.7">2.7</option><option value="2.3">2.3</option><option value="2">2</option><option value="1.7">1.7</option><option value="1.3">1.3</option></select></div>'
  );
}

function sum(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function getMidterm() {
  return (midterm / midtermOutof) * 25;
}
function getLabMidterm() {
  return (labMidterm / labMidtermOutof) * 25;
}

function getFinal() {
  return (final / finalOutof) * 50;
}

function getTotal(marks, outOf, multiple) {
  var sumOfMarks = sum(marks);
  var sumOfOutOf = sum(outOf);
  return (sumOfMarks / sumOfOutOf) * multiple;
}
