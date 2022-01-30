import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import ButtonSendSticker from '../src/components/ButtonSendSticker'

const Header = () => {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='heading5'>Chat</Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  )
}


const MessageList = (props) => {
  return (
    <Box
      tag='ul'
      styleSheet={{
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props.allmessages.map((message) => {
        return (
          <Text
            tag='li'
            key={message.id}
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${message.from}.png`}
                />
                <Text tag='strong'>{message.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag='span'
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Box>
                <Button
                  type='button'
                  label='X'
                  styleSheet={{
                    width: '30px',
                    height: '33px',
                    borderRadius: '50%',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    color: appConfig.theme.colors.primary[600],
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.neutrals[400],
                  }}
                  onClick={() => {
                    props.onDelete(message.id)
                  }}
                >
                  X
                </Button>
              </Box>
            </Box>
            {message.text.startsWith(':sticker:') ? (
              <Image
                styleSheet={{
                  maxWidth: '150px',
                  height: 'auto',
                }}
                src={message.text.replace(':sticker:', '')}
              />
            ) : (
              message.text
            )}
          </Text>
        )
      })}
    </Box>
  )
}

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwMTc4NCwiZXhwIjoxOTU4ODc3Nzg0fQ.LBcZyPDE9mHowRIAiVC0FU2dmupCFkmn70m3g6uerxU'

const SUPABASE_URL = 'https://ilnaglrbjntysewiqytb.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// const realTimeMessageListener = (addNewMessage) => {
//   return supabaseClient
//     .from('mensagens')
//     .on('INSERT', (responseLive) => addNewMessage(responseLive.new))
//     .subscribe()
// }

export default function ChatPage({ user, SUPABASE_URL, SUPABASE_ANON_KEY }) {
  const routing = useRouter()
  const loggedUser = routing.query.username
  /**query=chave e username=valor do path /chat?username=ElaineDelgado*/
  /*console.log(routing.query) {username: 'ElaineDelgado'}*/
  const [message, setMessage] = React.useState('')
  const [chat, setChat] = React.useState([])
  const handleMessage = (event) => {
    setMessage(event.target.value)
  }

  const listeningChanges = (response) => {
    return supabaseClient
    .from('mensagens') 
    .on('INSERT', (responseLive) => {
      response(responseLive)
    })
    .on('DELETE', (responseLive) => {
      response(responseLive.old.id)
    })
    .subscribe()
  }

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => setChat(data))
      const subscribe = listeningChanges((response) => {
        console.log(response.eventType)
        if (response.eventType === 'INSERT') {
          setChat((currentValue) => {
            return [...currentValue, response.new]
          })
        } else {
          setChat((currentValue) =>
            currentValue.filter((value) => value.id !== response),
          )
        }
      })
      return () => subscribe.unsubscribe()
  }, [])

  const handleNewMessages = (novaMensagem) => {
    const message = {
      from: loggedUser,
      text: novaMensagem,
    }

    supabaseClient
      .from('mensagens')
      .insert([message])
      .then(({ data }) =>{})

    setMessage('')
    console.log(novaMensagem);
  }

  const handleDeleteMessage =  (messageId) => {
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: messageId })
      .then(({ data }) => {
        console.log(data)
      })
  }

  const handleSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleNewMessages(message)
    }
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList allmessages={chat} onDelete={handleDeleteMessage} />

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              onChange={handleMessage}
              onKeyPress={handleSubmit}
              value={message}
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) =>
                handleNewMessages(`:sticker:${sticker}`)
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
