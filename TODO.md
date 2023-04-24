## TODO

### Backend:

- [ ] Add staging branch
- [ ] Add staging DB
- [ ] Create data return filters

### Payment:

- [ ] Status field (Due soon | Overdue | Complete) - User can define complete state
- [x] Due date should not be required field
- [x] Handle date formatting between FE and BE
- [ ] Apply correct validation on createPayment mutation
- [ ] Reset form on cancel / successful save
- [ ] Add toast notification on form success / error

### Payments View:

- [ ] Display: Name | Amount | Due Date (if provided) | Status (Due soon | Overdue | Complete)
- [x] Order by due date descending
- [ ] Ability to mark as complete
- [ ] Ability to edit payment
- [ ] Add graph to display incoming and outgoing payments for year to date
- [ ] Total incoming (Period TBD)
- [ ] Total outgoing (Period TBD)
- [ ] Total remaining (Period TBD)
