$(document).ready(function() {
    var courseTable = $("#courseTable")
    var courses
    var addedCourses = []
    $.getJSON('resources/json/courses.json', function(courseData) {
        courses = []
        for (var dept in courseData) {
            courses = courses.concat(courseData[dept])
        }
        setupSearch()
    })

    var substringMatcher = function(courseList) {
        return function findMatches(query, callback) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(query, 'i');
            $.each(courseList, function(i, course) {
                if (substrRegex.test(course.name)) {
                    matches.push(course);
                }
            });
            callback(matches);
        };
    };

    function setupSearch() {
        var searchBox = $("#courseSearch")
        searchBox.typeahead({
            name: 'courses',
            source: substringMatcher(courses),
            updater: addCourse
        });
    }

    function addCourse(selectedCourse) {
        if ($.inArray(selectedCourse, addedCourses) == -1) {
            addedCourses.push(selectedCourse)
            var row = $("<tr>")
            row.append($("<td>" + "<button class='btn btn-default btn-xs remove' type='button'><i class='glyphicon glyphicon-remove'></i></button>" + "</td>"))
            row.append($("<td>" + selectedCourse.code + "</td>"))
            row.append($("<td>" + selectedCourse.name + "</td>"))
            row.append($("<td>" + selectedCourse.slot + "</td>"))
            courseTable.append(row)
            $(".remove").click(function () {
                row = $(this).parent().parent()
                index = courseTable.children().children().index(row)
                index = index - 1
                if (index > -1) {
                    addedCourses.splice(index, 1)
                }
                row.remove()
            })
        }
    }

})
