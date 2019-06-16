import json
import dialogflow_v2beta1 as dialogflow

session_client = dialogflow.SessionsClient.from_service_account_json(
    "dialogflow_serviceaccount.json"
)
with open("dialogflow_serviceaccount.json", "r") as f:
    sacc = json.load(f)
project_id = sacc["project_id"]


def detect_intent(session_id, text, language_code="en"):
    """Returns the result of detect intent with texts as inputs.
    Using the same `session_id` between requests allows continuation
    of the conversation."""

    session = session_client.session_path(project_id, session_id)

    text_input = dialogflow.types.TextInput(text=text, language_code=language_code)

    query_input = dialogflow.types.QueryInput(text=text_input)

    response = session_client.detect_intent(session=session, query_input=query_input)

    return response


def dialogflow_comp(state, inp):
    interpretation = detect_intent(state["session_id"], inp).query_result
    if (
        interpretation.intent.display_name == "Default Welcome Intent"
        and not "name" in state
    ):
        return [], "namer_comp", False
    return [interpretation.fulfillment_text], None, False
