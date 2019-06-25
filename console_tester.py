#! /usr/bin/env python3

import uuid
import runner
import coffeeshop

session_id = str(uuid.uuid4())
state = {"control_stack": ["entry_comp"], "session_id": session_id}

while True:
    inp = input("U: ")
    state, responses = runner.get_response(coffeeshop, state, inp)

    for response in responses:
        print(f"B: {response}")
