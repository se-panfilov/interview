/*
* Implement a function that returns the summary of the current user's latest conversations,
* sorted by the latest message's timestamp (most recent conversation first).
*
* Make sure to have good unit tests in addition to the provided integration test!
*
* You have the following REST API available (base URL provided as a constant):
*
* Get current user's conversations: GET /conversations
* Get messages in a conversation: GET /conversations/:conversation_id/messages
* Get user by ID: GET /users/:user_id
*
* The result should be an array of objects of the following shape/type:
* {
*   id : string;
*   latest_message: {
*     body : string;
*     from_user : {
*       id: string;
*       avatar_url: string;
*     };
*     created_at : ISOString;
*   };
* }
*
*/

// TODO (S.Panfilov)
const fetch = require('node-fetch')

const API_BASE_URL = "http://ui-developer-backend.herokuapp.com/api"

const ERRORS = {
  badRequest: 400,
  notFound: 404,
  methodNotAllowed: 405,
  internalServerError: 500,
  serviceUnavailable: 503
}

function showError (message) {
  console.error(message)
}

function onError (response) {
  switch (response.status) {
    case ERRORS.badRequest:
      return showError('Bad request')
    case ERRORS.notFound:
      return showError('Not found')
    case ERRORS.methodNotAllowed:
      return showError('Method not allowed')
    case ERRORS.internalServerError:
      return showError('Internal server error')
    case ERRORS.serviceUnavailable:
      return showError('Service unavailable')
    default:
      return showError('Unknown error')
  }
}

async function getData (url) {
  if (!url) throw new Error('Url should be provided')

  return fetch(`${API_BASE_URL}/${url}`).then(response => {
    if (!response.ok) return onError(response)

    return response.json()
  })
}

async function getConversations () {
  return getData('conversations')
}

async function getMessages (id) {
  if (!Number.isFinite(+id)) throw new Error('Invalid id provided')

  return getData(`/conversations/${id}/messages`)
}

async function getUser (id) {
  if (!Number.isFinite(+id)) throw new Error('Invalid id provided')

  return getData(`/users/${id}`)
}

async function getMessagesForConversations (conversations) {
  if (!Array.isArray(conversations)) throw new Error('Conversations should be an array')

  return Promise.all(conversations.map(async (v) => ({
    conversation_id: v.id,
    messages: await getMessages(v.id)
  })))
}

function getLatestMessages (messages) {
  return messages.map(v => ({conversation_id: v.conversation_id, latest_message: v.messages[0]}))
}

async function getUsersForConversations (conversations) {
  if (!Array.isArray(conversations)) throw new Error('Conversations should be an array')

  const idArr = conversations.map(v => v.with_user_id)
  return Promise.all(idArr.map(async (v) => ({
    user_id: v,
    avatar_url: (await getUser(v)).avatar_url
  })))
}

function buildResponse (messages, users) {
  if (!Array.isArray(messages)) throw new Error('Messages should be an array')
  if (!Array.isArray(users)) throw new Error('Users should be an array')
  if (messages.length !== users.length) throw new Error('Inconsistent data provided')

  const result = messages.map(v => {
    const result = {
      id: v.conversation_id,
      latest_message: {
        id: v.latest_message.id,
        body: v.latest_message.body,
        created_at: v.latest_message.created_at
      }
    }

    const fromUserId = v.latest_message.from_user_id
    result.latest_message.from_user = users.map(v => ({id: v.user_id, avatar_url: v.avatar_url})).find(v => v.id === fromUserId)

    return result
  })

  // console.dir(result, {showHidden: true, depth: null, colors: true})

  return result

}

async function getRecentConversationSummaries () {
  const conversations = await getConversations()
  const users = await getUsersForConversations(conversations)
  console.info(users)
  const messages = await getMessagesForConversations(conversations)
  const latestMessages = getLatestMessages(messages)

  return buildResponse(latestMessages, users)
}

// TODO (S.Panfilov)
const mocha = require('mocha')
const expect = require('chai').expect
const should = require('chai').should

// Configure Mocha, telling both it and chai to use BDD-style tests.
// mocha.setup("bdd")
// const expect = chai.expect
// chai.should()

describe('getRecentConversationSummaries()', () => {
  it('should return the current user\'s latest conversations sorted by latest message\'s timestamp', async () => {
    const result = await getRecentConversationSummaries()

    // result.should.deep.equal([
    expect(result).to.be.deep.equal([
      {
        id: "1",
        latest_message: {
          id: "1",
          body: "Moi!",
          from_user: {
            id: "1",
            avatar_url: "http://placekitten.com/g/300/300",
          },
          created_at: "2016-08-25T10:15:00.670Z",
        },
      },
      {
        id: "2",
        latest_message: {
          id: "2",
          body: "Hello!",
          from_user: {
            id: "3",
            avatar_url: "http://placekitten.com/g/302/302",
          },
          created_at: "2016-08-24T10:15:00.670Z",
        },
      },
      {
        id: "3",
        latest_message: {
          id: "3",
          body: "Hi!",
          from_user: {
            id: "1",
            avatar_url: "http://placekitten.com/g/300/300",
          },
          created_at: "2016-08-23T10:15:00.670Z",
        },
      },
      {
        id: "4",
        latest_message: {
          id: "4",
          body: "Morning!",
          from_user: {
            id: "5",
            avatar_url: "http://placekitten.com/g/304/304",
          },
          created_at: "2016-08-22T10:15:00.670Z",
        },
      },
      {
        id: "5",
        latest_message: {
          id: "5",
          body: "Pleep!",
          from_user: {
            id: "6",
            avatar_url: "http://placekitten.com/g/305/305",
          },
          created_at: "2016-08-21T10:15:00.670Z",
        },
      },
    ])
  })

  // TODO: Add more tests
})

// TODO (S.Panfilov)
// Run all our test suites.  Only necessary in the browser.
// mocha.run()
