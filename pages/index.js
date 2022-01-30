import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import React from 'react'

const Title = (props) => {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.primary['400']};
            font-size: 2.4rem;
            line-height: 1.3;
          }
        `}
      </style>
    </>
  )
}

const HomePage = () => {
  const [username, setUsername] = React.useState('')
  const handleInputChange = (event) => setUsername(event.target.value)
  const routing = useRouter()
  const [userlocation, setUserlocation] = React.useState('')

  const loadUserlocation = async () => {
    const url = `https://api.github.com/users/${username}`
    let response = await fetch(url)
    let json = await response.json()
    setUserlocation(json.location)
  }
  React.useEffect(() => {
    loadUserlocation()
  }, [username])

  const handleSubmit = (event) => {
    event.preventDefault()
    {
      username && routing.push(`/chat?username=${username}`)
    }
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['400'],
          backgroundImage:
            'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as='form'
            onSubmit={handleSubmit}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <Title tag='h1'>Seja bem vindo de volta!</Title>
            <Text
              variant='body3'
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              onChange={handleInputChange}
              value={username}
              placeholder='Digite seu usuário Github'
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighLight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Fim Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={
                username.length > 2
                  ? `https://github.com/${username}.png`
                  : 'https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png'
              }
            />
            {username.length > 2 && (
              <Text
                variant='body4'
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
              >
                <p>{username} </p>
                <p>{userlocation}</p>
              </Text>
            )}
          </Box>
          {/* Fim Photo Area */}
        </Box>
      </Box>
    </>
  )
}

export default HomePage
