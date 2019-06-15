
import requests


def call_coco(component_id, session_id, **kwargs):
    return requests.post(
            "https://coco-235210.appspot.com/api/exchange/"
            f"{component_id}/{session_id}",
            json=kwargs).json()

