import requests
import json

BASE_URL="https://staffportal.cis-staff.curtin.edu.au/api/publicProfiles/"
AUTHORIZATION="Basic c3ZjLXN0YWZmLXBvcnRhbC1wdWJsaWMtdXNlci1wcmQ6dSFyKkkhRiZVeGMkQzlyNQ=="

people_summaries = []
with open("_data/people.txt") as people_identifiers:
    for id in (line.strip() for line in people_identifiers):
        print(f"{BASE_URL}{id}")
        try:
            response = requests.get(f"{BASE_URL}{id}", headers={"authorization": AUTHORIZATION, "x-caller-id": "Public Staff Profile App", "x-consumer-id": "Staff Portal", "x-correlation-id": "67f779b758061"})
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            print(f"Failure status code for {id}, aborting.")
            break
        except requests.exceptions.RequestException as e:
            print(f"Could not fetch data for {id}, aborting.")
            break
        
        data = response.json().get("data", {})
        staff_data = data.get("staff", {})
        image = data.get("relatedFile", {}).get("file", {}).get("uri")
        name_info = staff_data.get("name", {})
        position = staff_data.get("occupancy", {}).get("position", {}).get("positionTitle")
        person_summary = {"first_name": name_info.get("preferredGivenName"), "last_name": name_info.get("preferredFamilyName"), "position": position, "image": image}
        people_summaries.append(person_summary)

with open("_data/people-info.json", "w") as f:
    json.dump(people_summaries, f, ensure_ascii=False, indent=4)
        