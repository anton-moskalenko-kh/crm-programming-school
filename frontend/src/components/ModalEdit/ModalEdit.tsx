import React, {FC, useEffect, useState} from 'react';
import styles from './ModalEdit.module.css'
import {useForm} from "react-hook-form";
import {IOrderModel} from "../../models/IOrderModel";
import {groupsService} from "../../services/groups.api.service";
import {IGroupsModel} from "../../models/IGroupsModel";

interface IOrderDetailsProps {
  order: IOrderModel,
  closeModal: () => void
}

const ModalEdit: FC<IOrderDetailsProps> = ({order, closeModal}) => {
  const { register, handleSubmit, reset } = useForm<Partial<IOrderModel>>();
  const [groups, setGroups] = useState<IGroupsModel[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isAddingGroup, setIsAddingGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect( () => {
    const getGroups = async () => {
      try {
        const savedGroups = await groupsService.getGroups();
        setGroups(savedGroups);
      } catch (e) {
        console.log(e);
      }
    }

    getGroups();
  }, []);

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) {
      setErrorMessage('Group name cannot be empty!');
      return;
    }
    if (groups.some((group) => group.group === newGroupName.trim())) {
      setErrorMessage('Group name must be unique!');
      return;
    }
    try {
      const newGroup = await groupsService.addGroup({ group: newGroupName.trim() });
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      setSelectedGroup(newGroup.group);
      setNewGroupName('');
      setIsAddingGroup(false);
      setErrorMessage('');
    } catch (e) {
      console.error('Error adding group:', e);
      setErrorMessage('Failed to add group. Please try again.');
    }
  };

  const handleSelectGroup = () => {
    setIsAddingGroup(false);
    setErrorMessage('');
  };


  const onSubmit = (formData: Partial<IOrderModel>) => {
    console.log("Form Data:", formData);
    closeModal();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="group" className={styles.label}>Group</label>
            {isAddingGroup ? (
              <div className={styles.addGroupContainer}>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter new group name"
                  className={`${styles.input} ${styles.groupInput}`}
                />
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddGroup}
                >
                  Add Group
                </button>
                <button
                  type="button"
                  className={styles.selectButton}
                  onClick={handleSelectGroup}
                >
                  Select
                </button>
              </div>
            ) : (
              <div className={styles.selectGroupContainer}>
                <select
                  {...register('group')}
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className={`${styles.select} ${styles.groupSelect}`}
                >
                  <option value="" disabled>
                    Select a group
                  </option>
                  {groups.map((group) => (
                    <option key={group.group} value={group.group}>
                      {group.group}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => setIsAddingGroup(true)}
                >
                  Add Group
                </button>
              </div>
            )}
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          </div>

          <div className={styles.twoColumnGrid}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input {...register('name')} type="text" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="surname" className={styles.label}>Surname</label>
              <input {...register('surname')} type="text" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input {...register('email')} type="email" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>Phone</label>
              <input {...register('phone')} type="tel" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="age" className={styles.label}>Age</label>
              <input {...register('age')} type="number" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="status" className={styles.label}>Status</label>
              <select {...register('status')} className={styles.select}>
                <option value="in_work">In work</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="sum" className={styles.label}>Sum</label>
              <input {...register('sum')} type="number" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="already_paid" className={styles.label}>Already Paid</label>
              <input
                {...register('already_paid')}
                type="number"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="course" className={styles.label}>Course</label>
              <input {...register('course')} type="text" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label htmlFor="course_format" className={styles.label}>Course Format</label>
              <select {...register('course_format')} className={styles.select}>
                <option value="static">Static</option>
                <option value="dynamic">Dynamic</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="course_type" className={styles.label}>Course Type</label>
              <select {...register('course_type')} className={styles.select}>
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;