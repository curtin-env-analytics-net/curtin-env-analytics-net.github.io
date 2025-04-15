import requests
import json
import csv

BASE_URL="https://staffportal.cis-staff.curtin.edu.au/api/publicProfiles/"
AUTHORIZATION="Basic c3ZjLXN0YWZmLXBvcnRhbC1wdWJsaWMtdXNlci1wcmQ6dSFyKkkhRiZVeGMkQzlyNQ=="

people_summaries = []

emails_to_expertise = {}
name_to_expertise = {}
with open("_data/expertise.csv") as expertise_file:
    reader = csv.reader(expertise_file)
    # skip column headers of csv file
    next(reader)
    for name, email, expertise_string in reader:
        name_to_expertise[name] = expertise_string
        emails_to_expertise[email.lower()] = expertise_string

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
        if image is None:
            # skip staff members who do not have an image on their curtin profile
            continue
        name_info = staff_data.get("name", {})
        first_name = name_info.get("preferredGivenName")
        last_name = name_info.get("preferredFamilyName")
        position = staff_data.get("occupancy", {}).get("position", {}).get("positionTitle")
        email = staff_data.get("email", {}).get("emailAddress")
        if email is not None:
            email = email.lower()
        expertise = emails_to_expertise.get(email)
        if expertise is None:
            expertise = name_to_expertise.get(f"{first_name} {last_name}")
        person_summary = {"first_name": first_name, "last_name": last_name, "position": position, "image": image, "name_with_seo_suffix": id, "email": email, "expertise": expertise}
        people_summaries.append(person_summary)

with open("_data/people-info.json", "w") as f:
    json.dump(people_summaries, f, ensure_ascii=False, indent=4)
        