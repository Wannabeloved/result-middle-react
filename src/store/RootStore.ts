import { createContext, useContext } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

class RootStore {
  contacts: ContactDto[] = [];
  groups: GroupContactsDto[] = [];
  
  filters = {
    name: '',
    groupId: '',
  };

  isLoading = {
    contacts: false,
    groups: false,
  };

  error = {
    contacts: null as string | null,
    groups: null as string | null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Filter Actions
  setNameFilter(name: string) {
    this.filters.name = name;
  }

  setGroupFilter(groupId: string) {
    this.filters.groupId = groupId;
  }

  clearFilters() {
    this.filters.name = '';
    this.filters.groupId = '';
  }

  // Fetching Actions
  async fetchContacts() {
    this.isLoading.contacts = true;
    this.error.contacts = null;
    try {
      const response = await axios.get<ContactDto[]>('http://localhost:5000/contacts');
      runInAction(() => {
        this.contacts = response.data;
        this.isLoading.contacts = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error.contacts = err.message || 'Failed to fetch contacts';
        this.isLoading.contacts = false;
      });
    }
  }

  async fetchGroups() {
    this.isLoading.groups = true;
    this.error.groups = null;
    try {
      const response = await axios.get<GroupContactsDto[]>('http://localhost:5000/groups');
      runInAction(() => {
        this.groups = response.data;
        this.isLoading.groups = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error.groups = err.message || 'Failed to fetch groups';
        this.isLoading.groups = false;
      });
    }
  }

  // Mutation Actions
  async addContact(contact: Partial<ContactDto>) {
    try {
      const response = await axios.post<ContactDto>('http://localhost:5000/contacts', contact);
      runInAction(() => {
        this.contacts.push(response.data);
      });
    } catch (err) {
      console.error('Failed to add contact', err);
    }
  }

  async deleteContact(id: string) {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      runInAction(() => {
        this.contacts = this.contacts.filter(c => c.id !== id);
      });
    } catch (err) {
      console.error('Failed to delete contact', err);
    }
  }

  async toggleFavorite(id: string, isFavorite: boolean) {
    try {
      const response = await axios.patch<ContactDto>(`http://localhost:5000/contacts/${id}`, { isFavorite });
      runInAction(() => {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
          this.contacts[index] = response.data;
        }
      });
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  }

  // Computed / Helpers
  get filteredContacts() {
    const { name, groupId } = this.filters;
    const nameLower = name.toLowerCase();
    
    const group = this.groups.find(g => g.id === groupId);
    const contactIdsInGroup = group ? new Set(group.contactIds) : null;

    return this.contacts.filter(contact => {
      const nameMatch = !nameLower || contact.name.toLowerCase().includes(nameLower);
      const groupMatch = !contactIdsInGroup || contactIdsInGroup.has(contact.id);
      return nameMatch && groupMatch;
    });
  }

  get favoriteContacts() {
    return this.contacts.filter(contact => contact.isFavorite);
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
