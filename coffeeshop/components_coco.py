from .coco import call_coco
from .actions import get_drink_action


def namer_comp(state, inp):
    response = call_coco(
            "namer_vp3", 
            state["session_id"], 
            user_input=inp)
    if response["component_done"]:
        state["user"] = response["updated_context"]["user"]
        first_name = state["user"]["firstName"]
        return [get_drink_action(first_name)], None, True
    return [response["response"]], None, False


def get_address_comp(state, inp):
    response = call_coco(
            "get_address_vp3", 
            state["session_id"], 
            user_input=inp, 
            context={
                "user": state["user"]
                }
            )
    if response["component_done"]:
        state["address"] = response["updated_context"]["userInfoaddress"]
        return [], None, True
    return [response["response"]], None, False


def survey_comp(state, inp):
    response = call_coco(
            "CoCoSurvey_619c51d02b6eb5", 
            state["session_id"], 
            user_input=inp, 
            context={
                "user": state["user"]
                }
            )
    if response["component_done"]:
        state["survey"] = response["updated_context"]["survey_results"]
        return [response["response"]], None, True
    return [response["response"]], None, False

