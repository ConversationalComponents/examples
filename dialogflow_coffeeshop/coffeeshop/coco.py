import requests


def coco_exchange(component_id, session_id, **kwargs):
    """
    calls coco and try to maintain similar api.
    available optional kwargs are:
        user_input
        context

    full api spec available at app.coco.imperson.com

    Arguments:
        component_id {str} -- the component id from coco app
        session_id {str} -- a randomly generated session id to identify the session

    Returns:
        {
            "response": str,
            "component_done": bool,
            "component_failed": bool,
            "updated_context": dict
        }
        dict -- response from coco
    """
    return requests.post(
        "https://app.coco.imperson.com/api/exchange/"
        f"{component_id}/{session_id}",
        json=kwargs,
    ).json()
