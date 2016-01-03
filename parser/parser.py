from bs4 import BeautifulSoup
import json
import os

fileNames = ['ee.html', 'cse.html']
allCourses = {}
for fileName in fileNames:
    soup = BeautifulSoup(open(fileName), "html.parser")
    courseTable = soup.body.table
    rows = courseTable.find_all('tr', recursive=False)
    rows = rows[4:]
    courses = []
    for row in rows:
        course = {}
        columns = row.find_all('td')
        course['name'] = columns[3].string.strip()
        course['code'] = columns[2].a.string.strip()
        course['slot'] = columns[6].hr.previous_sibling.strip()
        courses.append(course)
    allCourses[os.path.splitext(fileName)[0]] = courses

f = open('courses.json', 'w')
f.write(json.dumps(
    allCourses,
    separators=(',', ':')
    )
)
