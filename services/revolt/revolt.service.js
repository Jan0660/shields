import Joi from 'joi'
import { BaseJsonService } from '../index.js'

const schema = Joi.object({
  server_name: Joi.string(),
  channel_name: Joi.string(),
}).required()

export default class RevoltServerInvite extends BaseJsonService {
  static category = 'chat'

  static route = {
    base: 'revolt/invite',
    pattern: ':inviteId',
  }

  static examples = [
    {
      title: 'Revolt invite',
      namedParams: { inviteId: 'Testers' },
      staticPreview: {
        label: 'Join server on Revolt!',
        message: 'general',
        color: 'brightgreen',
        style: 'chat',
      },
    },
  ]

  static defaultBadgeData = {
    label: 'revolt',
    namedLogo: 'revolt',
  }

  static render({ inviteId, serverName, channelName }) {
    return {
      label: `Join ${serverName} on Revolt!`,
      message: channelName,
      color: 'brightgreen',
      link: [`https://app.revolt.chat/invites/${inviteId}`],
    }
  }

  async fetch({ inviteId }) {
    return this._requestJson({
      schema,
      url: `https://api.revolt.chat/invites/${inviteId}`,
    })
  }

  async handle({ inviteId }) {
    const { server_name: serverName, channel_name: channelName } =
      await this.fetch({ inviteId })
    return this.constructor.render({
      inviteId,
      serverName,
      channelName,
    })
  }
}
