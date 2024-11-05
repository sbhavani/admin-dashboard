import json

input_fname = "data/patients-clean-v2.jsonl"
output_fname = "data/patients.jsonl"

def save_first_thousand_patients():
    try:
        count = 0
        with open(input_fname, 'r') as input_file, open(output_fname, 'w') as output_file:
            for line in input_file:
                if count >= 1000:
                    break
                patient = json.loads(line)
                json.dump(patient, output_file)
                output_file.write('\n')
                count += 1
        print(f"Successfully saved {count} patients to {output_fname}")
    except FileNotFoundError:
        print(f"Error: File '{input_fname}' not found")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in file")

if __name__ == "__main__":
    save_first_thousand_patients()
