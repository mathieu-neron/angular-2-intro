/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li class="item" [class.active]="selected==contact" *ngFor="let contact of contacts">
                <a href='#' (click)='select(contact)'>{{contact.firstName}} {{contact.lastName}}</a>
				<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>

        <contact-details [contact]="selected"></contact-details>
    `
})
export class ContactsListComponent implements OnInit {
    contacts: Contact[] = []

    selected: Contact

    @Output()
    selectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>()

    constructor(private contactsService: ContactsService) {}

    ngOnInit() {
        this.contactsService.getAll().then(
            contacts => this.contacts = contacts
        )
    }

    select(contact: Contact) {
        this.selected = contact
        this.selectedEvent.emit(contact)
    }
}