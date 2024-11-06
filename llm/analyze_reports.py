import os
import json
import google.generativeai as genai
import time

API_KEY = os.environ.get("GEMINI_API_KEY") or "AIzaSyDuaNkpzOzD3QFs01JQM3zj2RBBeC1BMho"

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

def parse_llm_response(response_text):
    """
    Parse LLM response text into JSON, handling potential formatting issues.
    
    Args:
        response_text (str): The raw text response from the LLM
        
    Returns:
        dict: Parsed JSON response
    """
    try:
        # First attempt: direct JSON parsing
        return json.loads(response_text)
    except json.JSONDecodeError:
        try:
            # Clean up the response text
            cleaned_text = (response_text
                          .strip()
                          .replace('```json\n', '')
                          .replace('```', '')
                          .replace('\\\\"', '"')  # Handle escaped quotes
                          .replace('\\\\', '\\'))  # Handle escaped backslashes
            return json.loads(cleaned_text)
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON response: {e}")
            print(f"Response text: {response_text[:200]}...")  # Print first 200 chars for debugging
            raise

def analyze_report(model, text):
    """
    Analyze medical report text using the provided LLM model.
    
    Args:
        model: The generative AI model instance
        text (str): The medical report text to analyze
        
    Returns:
        dict: Processed report data containing test info, diagnosis, and diagnosis list
    """
    try:
        chat_session = model.start_chat()
        # rv = chat_session.send_message(text)
        # rv_json = parse_llm_response(rv.text)        
        rv2 = chat_session.send_message("extract the diagnosis from the following text findings and impressions as 'diagnosis', provide a more concise diagnosis list based on snomed-ct terms as 'diagnosis_list' and provide the test name as 'test': " + text)
        rv2_json = parse_llm_response(rv2.text)
        
        print(rv2_json)

        # Handle potential key differences in response
        diagnosis = rv2_json.get('original_diagnosis_description') or rv2_json.get('diagnosis')
        diagnosis_list = rv2_json.get('snomed_ct_diagnosis_list') or rv2_json.get('diagnosis_list')
        
        result = {
            'test': rv2_json.get("test"),
            'diagnosis': diagnosis,
            'diagnosis_list': diagnosis_list
        }
        
        return result
    except Exception as e:
        print(f"Error in analyze_report: {str(e)}")
        raise

# Usage example:
if __name__ == "__main__":
  genai.configure(api_key=API_KEY)

  # text = '\"OBR||BH01201909050258|LO19000224241|TEST000466^CT CHEST/THORAX/LUNGS WITH CONTRAST||||||||||||||||||||CT|||||||||||||OBX|1|FT|TEST000466^CT CHEST/THORAX/LUNGS WITH CONTRAST|848416|\\\\\\\\CT THORAX (PLAIN)\\\\\\\\A Preliminary AP topogram of the Thorax was obtained. Volume scans were performed starting from apices of lungs down to the level of domes of diaphragm employing 0.625 mm sections. Multiplanar reconstructions were performed. \\\\\\\\Follow upImage degradation due to patient motion..\\\\\\\\FINDINGS & IMPRESSION:\\\\\\\\As compared to previous CT dated 07/03/2019 the present CT study shows:\\\\\\\\CVC in situ.\\\\\\\\Interval increase in the left upper lobe consolidation extending into the lingula. \\\\\\\\There is interval increase in the mediastinal adenopathy, predominantly in the prevascular location, these measure approximately 13-14 mm.\\\\\\\\\"'

  model = genai.GenerativeModel(
      model_name="gemini-1.5-pro-002",
      generation_config=generation_config,
  )

  with open('data/patients.jsonl', 'r') as file, open('data/enriched_patients.jsonl', 'w') as outfile:
      for i, line in enumerate(file):
          print(f"Processing patient {i+1}")
          patient_data = json.loads(line)
          text = patient_data['report'].replace('\\\\', '\\')
          
          retries = 3
          while retries > 0:
              try:
                  result = analyze_report(model, text)
                  patient_data.update(result)
                  json.dump(patient_data, outfile)
                  outfile.write('\n')
                  break
              except Exception as e:
                  if '429' in str(e):  # Rate limit error
                      print(f"Rate limit reached, waiting 60 seconds... ({retries} retries left)")
                      time.sleep(60)
                      retries -= 1
                  else:
                      print(f"Error analyzing report for patient {i+1}: {str(e)}")
                      break
          
          # Rate limiting between successful requests
          time.sleep(1)  # Add small delay between requests
          if (i + 1) % 50 == 0:  # Reduced batch size to be more conservative
              print("Batch complete, waiting 60 seconds...")
              time.sleep(60)
