-- PrimeFlex Cash Loan Platform - Supabase SQL Schema
-- This schema includes tables for users, loan applications, loans, payments, referrals, and documents

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for authentication and profile)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) UNIQUE NOT NULL,
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    employment_status VARCHAR(50) CHECK (employment_status IN ('employed', 'self-employed', 'pensioner', 'unemployed')),
    monthly_income DECIMAL(12, 2),
    credit_score INTEGER,
    credit_limit DECIMAL(12, 2) DEFAULT 0,
    available_credit DECIMAL(12, 2) DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_id_number ON users(id_number);

-- Loan Applications table
CREATE TABLE loan_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    application_number VARCHAR(20) UNIQUE NOT NULL,
    requested_amount DECIMAL(12, 2) NOT NULL,
    loan_term_months INTEGER NOT NULL,
    purpose TEXT,
    employment_status VARCHAR(50) NOT NULL,
    monthly_income DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'funded')),
    rejection_reason TEXT,
    approved_amount DECIMAL(12, 2),
    approved_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on application_number and user_id
CREATE INDEX idx_loan_applications_number ON loan_applications(application_number);
CREATE INDEX idx_loan_applications_user_id ON loan_applications(user_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);

-- Loans table (active loans after approval)
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loan_number VARCHAR(20) UNIQUE NOT NULL,
    application_id UUID REFERENCES loan_applications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    principal_amount DECIMAL(12, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    total_repayment DECIMAL(12, 2) NOT NULL,
    monthly_payment DECIMAL(12, 2) NOT NULL,
    loan_term_months INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paid', 'defaulted', 'cancelled')),
    outstanding_balance DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on loan_number and user_id
CREATE INDEX idx_loans_number ON loans(loan_number);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_status ON loans(status);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_number VARCHAR(20) UNIQUE NOT NULL,
    loan_id UUID REFERENCES loans(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    payment_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'late', 'missed')),
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on payment_number, loan_id, and due_date
CREATE INDEX idx_payments_number ON payments(payment_number);
CREATE INDEX idx_payments_loan_id ON payments(loan_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_due_date ON payments(due_date);
CREATE INDEX idx_payments_status ON payments(status);

-- Documents table (for storing document metadata)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES loan_applications(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('payslip', 'bank_statement', 'id_document', 'proof_of_address', 'other')),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    upload_status VARCHAR(50) DEFAULT 'pending' CHECK (upload_status IN ('pending', 'uploaded', 'verified', 'rejected')),
    verification_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and document_type
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_documents_type ON documents(document_type);

-- Referrals table
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    referred_email VARCHAR(255),
    referred_phone VARCHAR(20),
    referred_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'registered', 'loan_approved', 'completed')),
    commission_amount DECIMAL(12, 2),
    commission_paid BOOLEAN DEFAULT FALSE,
    loan_amount DECIMAL(12, 2),
    loan_id UUID REFERENCES loans(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on referral_code and referrer_id
CREATE INDEX idx_referrals_code ON referrals(referral_code);
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_status ON referrals(status);

-- Referral Agents table (for professional referral agents)
CREATE TABLE referral_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agent_code VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
    total_referrals INTEGER DEFAULT 0,
    successful_referrals INTEGER DEFAULT 0,
    total_commission DECIMAL(12, 2) DEFAULT 0,
    pending_commission DECIMAL(12, 2) DEFAULT 0,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on agent_code and user_id
CREATE INDEX idx_referral_agents_code ON referral_agents(agent_code);
CREATE INDEX idx_referral_agents_user_id ON referral_agents(user_id);

-- Contact Messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on status and created_at
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Audit Log table (for tracking changes)
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and created_at
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON loan_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON loans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referral_agents_updated_at BEFORE UPDATE ON referral_agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate application number
CREATE OR REPLACE FUNCTION generate_application_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.application_number := 'PF-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('application_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Sequence for application numbers
CREATE SEQUENCE application_number_seq START 1;

-- Trigger for application number
CREATE TRIGGER generate_application_number_trigger BEFORE INSERT ON loan_applications
    FOR EACH ROW EXECUTE FUNCTION generate_application_number();

-- Function to generate loan number
CREATE OR REPLACE FUNCTION generate_loan_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.loan_number := 'LN-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('loan_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Sequence for loan numbers
CREATE SEQUENCE loan_number_seq START 1;

-- Trigger for loan number
CREATE TRIGGER generate_loan_number_trigger BEFORE INSERT ON loans
    FOR EACH ROW EXECUTE FUNCTION generate_loan_number();

-- Function to generate payment number
CREATE OR REPLACE FUNCTION generate_payment_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.payment_number := 'PAY-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('payment_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Sequence for payment numbers
CREATE SEQUENCE payment_number_seq START 1;

-- Trigger for payment number
CREATE TRIGGER generate_payment_number_trigger BEFORE INSERT ON payments
    FOR EACH ROW EXECUTE FUNCTION generate_payment_number();

-- Function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    NEW.referral_code := 'REF' || substring(md5(random()::TEXT), 1, 8);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for referral code
CREATE TRIGGER generate_referral_code_trigger BEFORE INSERT ON referrals
    FOR EACH ROW WHEN (NEW.referral_code IS NULL)
    EXECUTE FUNCTION generate_referral_code();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_agents ENABLE ROW LEVEL SECURITY;

-- Users RLS policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Loan Applications RLS policies
CREATE POLICY "Users can view own applications" ON loan_applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON loan_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Loans RLS policies
CREATE POLICY "Users can view own loans" ON loans
    FOR SELECT USING (auth.uid() = user_id);

-- Payments RLS policies
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Documents RLS policies
CREATE POLICY "Users can view own documents" ON documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Referrals RLS policies
CREATE POLICY "Users can view own referrals" ON referrals
    FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Users can insert own referrals" ON referrals
    FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Referral Agents RLS policies
CREATE POLICY "Users can view own agent profile" ON referral_agents
    FOR SELECT USING (auth.uid() = user_id);

-- Insert sample admin user (password should be hashed in production)
-- This is just for initial setup - remove in production
INSERT INTO users (email, password_hash, first_name, last_name, phone, id_number, employment_status, monthly_income, is_verified)
VALUES ('admin@primeflex.co.za', '$2b$10$placeholder_hash', 'Admin', 'User', '0646911623', '0000000000000', 'employed', 0, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Create storage buckets for documents (run this in Supabase dashboard or via API)
-- Bucket: documents
-- Bucket: payslips
-- Bucket: bank_statements
-- Bucket: id_documents

-- Grant permissions on storage buckets (run this in Supabase SQL editor after creating buckets)
-- ALTER STORAGE BUCKET documents OWNER TO postgres;
-- GRANT ALL ON STORAGE BUCKET documents TO authenticated;
-- GRANT SELECT ON STORAGE BUCKET documents TO anon;
