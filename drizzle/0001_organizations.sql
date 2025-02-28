-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subdomain TEXT NOT NULL UNIQUE,
    home_page TEXT,
    assistant_id TEXT,
    description TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    disabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add organization_id to users table
ALTER TABLE users 
ADD COLUMN organization_id UUID REFERENCES organizations(id);

-- Add organization_id to chats table
ALTER TABLE chats 
ADD COLUMN organization_id UUID REFERENCES organizations(id) NOT NULL;

-- Add organization_id to messages table
ALTER TABLE messages 
ADD COLUMN organization_id UUID REFERENCES organizations(id) NOT NULL;

-- Create indexes for better query performance
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_chats_organization ON chats(organization_id);
CREATE INDEX idx_messages_organization ON messages(organization_id);
CREATE UNIQUE INDEX idx_organizations_subdomain ON organizations(subdomain); 