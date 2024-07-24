import { useState } from 'react'
import ChatPane from './ChatPane'
import { mockChatPaneItems } from '../utils/mockChatPaneItems'
import { ChatType } from '../utils/interfaces';


export function ChatPaneTest () {
  const [ChatPaneHidden, setChatPaneHidden] = useState<boolean>(false);

  const ChatPaneDisplayToggle = (status: boolean) => {
    setChatPaneHidden(status)
  }

  const PfromChatPane = async (clickedChat:ChatType) => {

  }

  return ( 
    <ChatPane
      ChatPaneDisplayToggle={ChatPaneDisplayToggle}
      ChatPaneItems={mockChatPaneItems}
      fromChatPane={PfromChatPane}
    /> 
  )
}

describe('<ChatPane />', () => {
  it('ChatPane is rendered', () => {
    cy.mount(<ChatPaneTest />)
    cy.get('[data-cy="chat-pane"]').should('exist')
  })

  it('Filter chats based on search inputer', () => {
    cy.mount(<ChatPaneTest />)
    const query = "bu"
    cy.get('[data-cy="chat-pane-input"]').type(query);

    const expectedChats = mockChatPaneItems.filter(item =>
      item.interlocutor.username.toLowerCase().includes(query.toLowerCase()) ||
      item.listingInfo.title.toLowerCase().includes(query.toLowerCase())
    );
    // Check that the number of displayed chat items matches the expected filtered results
    cy.get('[data-cy="chat-pane-item"]').should('have.length', expectedChats.length);

    expectedChats.forEach ((item:ChatType, index) => {
      cy.get('[data-cy="chat-pane-item"]').eq(index).contains(item.interlocutor.username);
    })

  })

  it('ChatPane is rendered with the correct chats', () => {
    cy.mount(<ChatPaneTest />)
    mockChatPaneItems.forEach ((item:ChatType) => {
      cy.get('[data-cy="chat-pane-item"]').contains(item.interlocutor.username).should('exist')
    })
  })






})