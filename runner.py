import coffeeshop


def get_response(state, inp):
    responses, new_comp, need_to_pop = getattr(coffeeshop, state["control_stack"][-1])(
        state, inp
    )
    if need_to_pop:
        state["control_stack"].pop()
    if new_comp:
        state["control_stack"].append(new_comp)
    if len(responses) == 0:
        return get_response(state, inp)

    return state, responses
