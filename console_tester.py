#! /usr/bin/env python3

import runner
import uuid

session_id = str(uuid.uuid4())
state = {"control_stack":["dialogflow_comp"], "session_id":session_id}
while(True):
    inp = input("U: ")
    state, responses = runner.get_response(state, inp)
                
    for response in responses:
        print(f"B: {response}") 
                                    
