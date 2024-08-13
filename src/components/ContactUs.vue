<template>
    <v-container fluid>

        <v-card 
            min-width="1280px"
            min-height="100%"
            class="mx-auto"
        >
            <v-card-title>
                Contact Us
            </v-card-title>
            <v-form ref="form">
                <v-card-item  class="pt-12">
                    <v-row>
                        <v-col cols="5">
                            <v-text-field
                                v-model="firstName"
                                label="First Name"
                            /> 
                        </v-col>
                        <v-spacer />
                        <v-col cols="5">
                            <v-text-field
                                v-model="lastName"
                                label="Last Name"
                            /> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="email"
                                label="Email"
                            /> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="subject"
                                label="Subject"
                            /> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                v-model="message"
                                label="Message"
                            /> 
                        </v-col>
                    </v-row>
                    
                </v-card-item>
            </v-form>
            <v-card-actions>
                <v-spacer />
                <v-btn text="Clear" @click="clear" prepend-icon="mdi-cancel"></v-btn>
                <v-btn text="Submit" @click="submit" prepend-icon="mdi-email-arrow-right-outline"></v-btn>
            </v-card-actions>
        </v-card>
    </v-container>  
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
        }
    },
    methods: {
        clear() {
            this.$refs.form.reset()
        },
        submit() {
            toast.success('Message Delievered', {
                autoClose: 1000,
            })
            this.clear()
        },
    },
  }
  </script>
  