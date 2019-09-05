# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.


class ConversationData:
    def __init__(
        self,
        timestamp: str = None,
        channel_id: str = None,
        first_turn: bool = True
    ):
        self.timestamp = timestamp
        self.channel_id = channel_id
        self.first_turn = first_turn
