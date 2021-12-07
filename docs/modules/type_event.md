[xianyu-robot](../README.md) / [Exports](../modules.md) / Type/Event

# Module: Type/Event

## Table of contents

### Interfaces

- [Anonymous](../interfaces/type_event.anonymous.md)
- [ClientStatus](../interfaces/type_event.clientstatus.md)
- [Essence](../interfaces/type_event.essence.md)
- [Friend](../interfaces/type_event.friend.md)
- [FriendAdd](../interfaces/type_event.friendadd.md)
- [FriendRecall](../interfaces/type_event.friendrecall.md)
- [Group](../interfaces/type_event.group.md)
- [GroupAdmin](../interfaces/type_event.groupadmin.md)
- [GroupBan](../interfaces/type_event.groupban.md)
- [GroupCard](../interfaces/type_event.groupcard.md)
- [GroupDecrease](../interfaces/type_event.groupdecrease.md)
- [GroupIncrease](../interfaces/type_event.groupincrease.md)
- [GroupNotify](../interfaces/type_event.groupnotify.md)
- [GroupRecall](../interfaces/type_event.grouprecall.md)
- [GroupSender](../interfaces/type_event.groupsender.md)
- [GroupUpload](../interfaces/type_event.groupupload.md)
- [OfflineFile](../interfaces/type_event.offlinefile.md)
- [PrivateSender](../interfaces/type_event.privatesender.md)
- [\_GroupMsg](../interfaces/type_event._groupmsg.md)
- [\_PrivateMsg](../interfaces/type_event._privatemsg.md)

### Type aliases

- [GroupMsg](type_event.md#groupmsg)
- [PrivateMsg](type_event.md#privatemsg)

## Type aliases

### GroupMsg

Ƭ **GroupMsg**: [*\_GroupMsg*](../interfaces/type_event._groupmsg.md) & { `nextMessage`: (`fn`: (`msg`: *string*, `event`: [*GroupMsg*](type_event.md#groupmsg)) => [*Prevent*](type_bot.md#prevent)) => *void*  }

Defined in: Type/Event.ts:76

___

### PrivateMsg

Ƭ **PrivateMsg**: [*\_PrivateMsg*](../interfaces/type_event._privatemsg.md) & { `nextMessage`: (`fn`: (`msg`: *string*, `event`: [*PrivateMsg*](type_event.md#privatemsg), `prevEvent`: [*\_PrivateMsg*](../interfaces/type_event._privatemsg.md)) => [*Prevent*](type_bot.md#prevent)) => *void*  }

Defined in: Type/Event.ts:5
