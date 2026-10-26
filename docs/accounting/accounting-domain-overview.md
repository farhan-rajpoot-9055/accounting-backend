# Accounting Domain Overview

## Purpose
The accounting module is the financial backbone of the ERP. It implements double-entry bookkeeping with strict integrity rules to ensure accurate financial records.

## Core Principles
- **Double-Entry Bookkeeping**: Every transaction affects at least two accounts
- **Debit = Credit**: Every posted journal entry must balance
- **Historical Integrity**: Posted entries cannot be modified or deleted
- **Audit Trail**: Complete history of all financial transactions
- **Real-time Accuracy**: Balances always reflect true state
- **Separation of Concerns**: Business modules post through the accounting engine

## Chart of Accounts (COA)
Accounts are organized hierarchically with the following types:
- **Assets**: What the business owns
- **Liabilities**: What the business owes
- **Equity**: Owner's capital
- **Revenue/Income**: Income from operations
- **Expenses**: Costs of doing business

Each account has:
- Code (unique per company)
- Name
- Type and subtype
- Parent account (for hierarchy)
- Is active, is posting account
- Currency (if multi-currency)
- Tax relevant flags

## Journal Entries
A journal entry consists of:
- Header: Date, reference, journal, narration, source document
- Lines: Account, debit, credit, party, cost center, project (optional)
- Status: Draft, Posted, Reversed
- Audit info: Created by, posted by, posted at

## Posting Rules
1. **Balance Requirement**: Sum of debits must equal sum of credits
2. **Minimum Lines**: At least 2 lines required
3. **Posting Accounts Only**: Transactions go to posting accounts, not header accounts
4. **Period Validation**: Cannot post to closed/frozen periods
5. **Date Validation**: Must be within valid fiscal period
6. **Company Validation**: All accounts must belong to same company
7. **Approval**: May require approval based on settings

## Fiscal Year & Periods
- **Fiscal Year**: 12-month period (configurable start month)
- **Accounting Periods**: Monthly or custom periods
- **Period Status**: Open, Closed, Locked
- **Year End**: Special closing procedures
- **Period Locking**: Prevents posting to closed periods

## Core Reports
| Report | Purpose | Frequency |
|--------|---------|-----------|
| Trial Balance | Verify debits = credits | Daily/Monthly |
| General Ledger | All transactions by account | As needed |
| Balance Sheet | Financial position | Monthly/Quarterly/Yearly |
| Profit & Loss (Income Statement) | Profitability | Monthly/Quarterly/Yearly |
| Cash Flow | Cash movements | Monthly/Quarterly/Yearly |
| Journal Register | All journal entries | As needed |
| Account Ledger | Transactions for specific account | As needed |

## Integration with Business Modules
Business transactions automatically create journal entries:
- **Sales Invoice**: Dr. Accounts Receivable, Cr. Sales Revenue, Cr. Tax Payable
- **Customer Payment**: Dr. Cash/Bank, Cr. Accounts Receivable
- **Vendor Bill**: Dr. Expense/Asset/Inventory, Cr. Accounts Payable, Dr. Tax Receivable
- **Vendor Payment**: Dr. Accounts Payable, Cr. Cash/Bank
- **Payroll**: Dr. Salaries Expense, Cr. Cash/Payables, Cr. Statutory Payables
- **Inventory**: Stock movements affect COGS/Inventory accounts
- **Fixed Assets**: Depreciation postings

## Accounting Integrity Rules
1. **Immutability**: Posted entries never edited/deleted directly
2. **Reversals**: Corrections via reversal entries with links
3. **Reconciliation**: Subledgers must reconcile to control accounts
4. **Audit Trail**: All actions logged
5. **Decimal Precision**: Use exact decimal arithmetic
6. **Concurrency Control**: Prevent concurrent posting issues
7. **Idempotency**: Prevent duplicate postings
8. **Transaction Atomicity**: All-or-nothing posting

## Multi-Currency (Future)
Framework supports multi-currency but initial implementation may focus on single currency with extension points.

## Tax Handling
Taxes are calculated and posted through the tax module, integrated with sales/purchases and accounting.

## Best Practices
- Use meaningful account codes
- Maintain proper account hierarchy
- Post to correct periods
- Reconcile regularly
- Document adjustments
- Review trial balance frequently
- Follow consistent naming
