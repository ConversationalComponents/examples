# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import time
import pytz
from datetime import datetime

import puppet

from botbuilder.core import ActivityHandler, ConversationState, TurnContext, UserState
from botbuilder.schema import ChannelAccount

from data_models import ConversationData, UserProfile


class ElizaExampleBot(ActivityHandler):
    def __init__(self, conversation_state: ConversationState, user_state: UserState):
        if conversation_state is None:
            raise TypeError(
                "[StateManagementBot]: Missing parameter. conversation_state is required but None was given"
            )
        if user_state is None:
            raise TypeError(
                "[StateManagementBot]: Missing parameter. user_state is required but None was given"
            )

        self.conversation_state = conversation_state
        self.user_state = user_state

        self.conversation_data = self.conversation_state.create_property(
            "ConversationData"
        )
        self.user_profile = self.conversation_state.create_property("UserProfile")

    async def on_turn(self, turn_context: TurnContext):
        await super().on_turn(turn_context)

        await self.conversation_state.save_changes(turn_context)
        await self.user_state.save_changes(turn_context)

    async def on_members_added_activity(
        self, members_added: [ChannelAccount], turn_context: TurnContext
    ):
        for member in members_added:
            if member.id != turn_context.activity.recipient.id:
                await turn_context.send_activity(
                    "Welcome to Eliza example bot sample. Type anything to get started."
                )

    async def on_message_activity(self, turn_context: TurnContext):
        # Get the state properties from the turn context.
        user_profile = await self.user_profile.get(turn_context, UserProfile)
        conversation_data = await self.conversation_data.get(
            turn_context, ConversationData
        )

        if conversation_data.first_turn:
            await turn_context.send_activity("Hi, Tell me about yourself")
            conversation_data.first_turn = False
            return

        session_id = turn_context.activity.conversation.id
        user_input = turn_context.activity.text
        coco_resp = puppet.coco.coco_exchange("eliza_pv1", session_id, user_input)
        await turn_context.send_activity(coco_resp.response)


    def __datetime_from_utc_to_local(self, utc_datetime):
        now_timestamp = time.time()
        offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(
            now_timestamp
        )
        result = utc_datetime + offset
        return result.strftime("%I:%M:%S %p, %A, %B %d of %Y")
