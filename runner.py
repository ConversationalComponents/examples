import coffeeshop.components_dialogflow
import coffeeshop.components_coco

components_index = {
    "dialogflow_comp": coffeeshop.components_dialogflow.dialogflow_comp,
    "namer_comp": coffeeshop.components_coco.namer_comp,
}


def get_response(state, inp):
    responses, new_comp, need_to_pop = components_index[state["control_stack"][-1]](
        state, inp
    )
    if need_to_pop:
        state["control_stack"].pop()
    if new_comp:
        state["control_stack"].append(new_comp)
    if len(responses) == 0:
        return get_response(state, inp)

    return state, responses
