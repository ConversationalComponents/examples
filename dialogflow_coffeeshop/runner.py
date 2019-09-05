
def get_response(bot_module, state, inp):
    responses, new_comp, need_to_pop = getattr(bot_module, state["control_stack"][-1])(
        state, inp
    )
    if need_to_pop:
        state["control_stack"].pop()
    if new_comp:
        state["control_stack"].append(new_comp)
    if len(responses) == 0:
        return get_response(bot_module, state, inp)

    return state, responses
